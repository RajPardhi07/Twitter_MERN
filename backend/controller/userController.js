import userModel from "../model/userModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import tweetModel from "../model/tweetModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, username, location, work,bio } = req.body;

        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(200).send({
                success: true,
                message: "User already exited"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        const newUser = await userModel.create({
            name,
            username,
            email,
            password: hashedPassword,
            work,
            location,
            bio
        })
        res.status(201).json({
            success: true,
            message: "User created Successfully",
            newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Register user"
        })
    }
}



export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                message: "Email and Password required",
                success: true
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: true,
                message: "Incorrect Credencials"
            })
        }
        const isMatch = bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                message: "Wrong credentials",
                success: true
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: "Login Successfully",
            success: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Login user"
        })
    }
}


export const getSingleUser = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await userModel.findById(id)
        res.status(200).json({
            success:true,
            message:"User get successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while get user"
        })
    }
}

export const editController = async (req, res) => {
    try {
        const { id } = req.params;

        const data = req.body;

        const editUser = await userModel.findByIdAndUpdate(id, data, { new: true }).select("-password")
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            editUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Edit user"
        })
    }
}


export const logoutController = (req, res) => {

    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "User Logged out Successfully",
        success: true
    })
}


export const bookmarks = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;

        const tweet = await tweetModel.findById(tweetId);
        const user = await userModel.findById(loggedInUserId);
        if (user.bookmarks.includes(tweetId)) {
            await userModel.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "remove post"
            })
        } else {
            await userModel.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "Saved post",
                tweet
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Saved tweet"
        })
    }
}


export const getMyBookmark = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id).select('bookmarks')
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const bookmarks = user.bookmarks ;

        res.status(200).json({
            message:"Get All Tweets",
            success:true,
            bookmarks,
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Get Bookmark tweet"
        })
    }
}


export const getMyProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id).select("-password")
        res.status(200).json({
            message: "User found successfully",
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Saved tweet"
        })
    }
}


export const getOtherUsers = async (req, res) => {
    try {
        const { id } = req.params;

        const otherusers = await userModel.find({ _id: { $ne: id } }).select("-password")
        res.status(200).json({
            otherusers
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while get others users"
        })
    }
}


// export const followController = async (req, res) => {
//     try {
//        const loggedInUserId = req.body.id;
//        const userId = req.params.id;
//        const loggedInUser = await userModel.findById(loggedInUserId);
//        const user = await userModel.findById(userId);
//        if(!user.followers.includes(loggedInUserId)){
//         await user.updateOne({$push:{followers:loggedInUserId}});
//         await loggedInUser.updateOne({$push:{following:userId}});
//        }else{
//         return res.status(400).json({
//             message:`User already followed to ${user.name}`
//         })
//        };
//        return res.status(200).json({
//         message:`${loggedInUser.name} just follow to ${user.name}`,
//         success:true
//        })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "Error while Follow users"
//         })
//     }
// }


export const followController = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await userModel.findById(loggedInUserId);
        const user = await userModel.findById(userId);

        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });
        } else {
            return res.status(400).send({
                message: `User already followed to ${user.name}`
            })
        }
        return res.status(200).json({
            message: `${loggedInUser.name} just follow to ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const unfollowController = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await userModel.findById(loggedInUserId);
        const user = await userModel.findById(userId);

        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });
        } else {
            return res.status(400).send({
                message: `User not follow yet`
            })
        }
        return res.status(200).json({
            message: `${loggedInUser.name} just unfollow to ${user.name}`,
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while get others users"
        })
    }
}