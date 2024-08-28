import tweetModel from "../model/tweetModel.js";
import userModel from "../model/userModel.js";






export const createTweetController = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(404).json({
                message: "Fields are required",
                success: true
            })
        }
        const user = await userModel.findById(id).select("-password");
        const newTweet = await tweetModel.create({
            description,
            userId: id,
            userDetails: user
        })
        return res.status(201).json({
            message: "Tweet created successfully",
            success: true,
            newTweet
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Create Tweet user"
        })
    }
}


export const deleteTweetController = async (req, res) => {
    try {
        const { id } = req.params;

        await tweetModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Tweet delete successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Delete Tweet user"
        })
    }
}

export const likeOrDislike = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;

        const tweet = await tweetModel.findById(tweetId);
        if (tweet.like.includes(loggedInUserId)) {
            //dislike
            await tweetModel.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
            return res.status(200).json({
                message: "User disliked your tweet"
            })
        } else {
            //like
            await tweetModel.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } })
            return res.status(200).json({
                message: "User liked your tweet"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while likeordislike Tweet user"
        })
    }
}


export const getAllTweets = async (req, res) => {
    // loggedInuser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const loggedInUser = await userModel.findById(id);
        const loggedInUserTweets = await tweetModel.find({ userId: id });
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return tweetModel.find({ userId: otherUserId });
        }))
        return res.status(200).json({
            tweets: loggedInUserTweets.concat(...followingUserTweet),
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting Tweet user"
        })
    }
}

export const getFollowingTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await userModel.findById(id);
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return tweetModel.find({ userId: otherUserId });
        }));
        return res.status(200).json({
            tweets: [].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}


// export const UserTweetController = async (req, res) => {
//     try {
//         const {id} = req.params;

//         const myTweet = await tweetModel.find(id);
//         if(!myTweet){
//             return res.status(404).send({
//                 message:"Tweet Not found"
//             })
//         }
//         res.status(200).json({
//             message:"All User Tweet",
//             success:true,
//             myTweet
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }


export const UserTweetController = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch tweets where the userId matches the provided id
        const myTweets = await tweetModel.find({ userId: id });
        if (!myTweets || myTweets.length === 0) {
            return res.status(404).json({
                message: "No tweets found for this user",
                success: false,
            });
        }
        res.status(200).json({
            message: "User's tweets fetched successfully",
            success: true,
            myTweets,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while fetching user's tweets",
        });
    }
}
