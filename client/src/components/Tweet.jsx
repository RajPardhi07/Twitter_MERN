import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { FaRegBookmark } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/constant';
import { getRefresh } from '../redux/tweetSlice';
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const Tweet = ({ tweet }) => {

    const { user } = useSelector(store => store.user);
    const [image, setImage] = useState();

    const [commentOpen, setCommentOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // console.log("comments", comments)

    // console.log("user", user)


    const formateDate = () => {
        const date = new Date(user?.createdAt);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const formattedDate = formateDate(user?.createdAt);


    const dispatch = useDispatch();

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/likeOrDislike/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Erro while like user")
            console.log(error);
        }
    }
    const bookmarkPostHandler = async (id) => {
        try {
            const res = await axios.put(`${USER_API_END_POINT}/bookmark/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getRefresh());
            alert("saved Post")
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Erro while bookmark user")
            console.log(error);
        }
    }

    const deleteTweetHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/deleteTweet/${id}`);
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Error while delete tweet")
            console.log(error)
        }
    }



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

    //     if (commentOpen) {
    //         fetchComments();
    //     }
    // }, [commentOpen, tweet._id]);


    // useEffect(() => {
    //     if (commentOpen) {
    //         axios.get(`http://localhost:8080/api/tweet/tweets/${tweet?._id}/comments`)
    //             .then(res => setComments(res?.data?.tweet?.comments))
    //             .catch(err => console.log(err));
    //     }
    // }, [commentOpen, tweet._id])

    const addCommentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/api/tweet/tweets/${tweet._id}/comments`, {
                tweetId: tweet?._id,
                userId: user._id,
                text: newComment,
            })
            console.log("varun", res)
            setComments([...comments, res.data.tweet.comments[res.data.tweet.comments.length - 1]]);
            setNewComment("")
            toast.success("Comment your Post")
        } catch (error) {
            toast.error("Error while create comment")

            console.log(error)
        }
    }

    const OpenCommentSection = () => {
        setCommentOpen(true)
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/getImage`,)
            .then(res => setImage(res.data[0].image))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex items-center gap-2 p-4'>



                    <div className='w-full'>

                        <div className='flex gap-3'>


                            <img
                                className="w-[3vw] h-[3vw] border cursor-pointer rounded-full object-top object-cover"
                                src={`http://localhost:8080/Images/` + image}
                                alt=""

                            />

                            <div>


                                <div className='flex items-center gap-2'>
                                    <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                                    <p>{tweet?.userDetails[0]?.username} </p>
                                    <p>{formattedDate}</p>

                                </div>
                                <div>
                                    <p>{tweet?.description}</p>
                                </div>
                            </div>
                        </div>


                        <div className='flex justify-between my-3'>
                            <div onClick={OpenCommentSection} className='flex cursor-pointer gap-2 items-center'>
                                <FaRegCommentAlt />
                                <p>0</p>
                            </div>
                            <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='flex gap-2 items-center'>
                                <FaRegHeart />
                                <p>{tweet?.like?.length}</p>
                            </div>
                            <div onClick={() => bookmarkPostHandler(tweet?._id)} className='flex gap-2 items-center'>
                                <FaRegBookmark />



                            </div>

                            {
                                user?._id === tweet?.userId && (
                                    <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                        <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                            <AiOutlineDelete />
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        {commentOpen && (
                            <div className='w-full  bg-red-400'>
                                <div>
                                    <FiArrowLeft className="" size="30px" onClick={OpenCommentSection(false)} />

                                </div>
                                <div className='flex items-center justify-between mt-7'>
                                    <input value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className='w-[34vw] outline-none text-xl h-[8vh]' type="text" placeholder='Post your reply' />
                                    <button type='submit' onClick={addCommentHandler}
                                        className='bg-blue-400 py-2 px-10 text-xl rounded-full text-white '>Reply</button>

                                </div>

                                <div className='allcomment'>
                                    {comments && comments.map((item, index) => (
                                        <div key={index}>
                                            <div className='flex gap-2'>

                                                <h3>{item?.userDetails?.name}</h3>
                                                <p>{item?.userDetails?.username}</p>
                                            </div>
                                            <h4>{item?.text}</h4>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>


                </div>
            </div>
        </div>
    )
}

export default Tweet