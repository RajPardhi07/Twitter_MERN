// useEffect(() => {
//     if (commentOpen) {
//         axios.get(`http://localhost:8080/api/tweet/tweets/${tweet?._id}/comments`)
//             .then(res => setComments(res?.data?.tweet?.comments))
//             .catch(err => console.log(err));
//     }
// }, [commentOpen, tweet._id])









// useEffect(() => {
//     const fetchComments = async () => {
//         try {
//             if (commentOpen) {
//                 const res = await axios.get(`http://localhost:8080/api/tweet/tweets/${tweet?._id}/comments`)
//                 console.log("Allcommet", res.data.tweet.comments)
//                 setComments(res?.data?.tweet?.comments)
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     // fetchComments();
// }, [commentOpen, tweet._id]);








// export const bookmarks = async (req, res) => {
//     try {
//         const loggedInUserId = req.body.id;
//         const tweetId = req.params.id;

//         const tweet = await tweetModel.findById(tweetId);
//         const user = await userModel.findById(loggedInUserId);
//         if (user.bookmarks.includes(tweetId)) {
//             await userModel.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
//             return res.status(200).json({
//                 message: "remove post"
//             })
//         } else {
//             await userModel.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
//             return res.status(200).json({
//                 message: "Saved post",
//                 tweet
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "Error while Saved tweet"
//         })
//     }
// }




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



