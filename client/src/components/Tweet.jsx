import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import { IoMdCloseCircle } from "react-icons/io";

import { FaRegBookmark } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/constant';
import { getRefresh } from '../redux/tweetSlice';
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from 'react';

const Tweet = ({ tweet }) => {

    const { user, profile } = useSelector(store => store.user);
    const [image, setImage] = useState();

    console.log("profile", tweet)
    const [commentOpen, setCommentOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // console.log("comments", comments.length)


    const dispatch = useDispatch();

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/likeOrDislike/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            // console.log(res);
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
            console.log("bookmarks", res);
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
            // console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Error while delete tweet")
            console.log(error)
        }
    }


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/tweet/tweets/${tweet?._id}/comments`)
                // console.log("Allcommet", res.data.tweet.comments)
                setComments(res?.data?.tweet?.comments)

            } catch (err) {
                console.log(err);
            }
        };

        fetchComments();

    }, [commentOpen, tweet._id]);




    const addCommentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/api/tweet/tweets/${tweet._id}/comments`, {
                tweetId: tweet?._id,
                userId: user._id,
                text: newComment,
            })
            setComments([...comments, res?.data?.tweet?.comments[res?.data?.tweet?.comments?.length - 1]]);
            setNewComment("")
            toast.success("Comment your Post")
        } catch (error) {
            toast.error("Error while create comment")

            console.log(error)
        }
    }

    const deleteCommentHandler = async (commentId) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/tweet/tweets/${tweet._id}/comments/${commentId}`, {
                data: { userId: user._id },
                withCredentials: true
            })

            setComments(comments.filter(comment => comment._id !== commentId));
            toast.success(res.data.message);
        } catch (error) {
            console.log(error)
        }
    }



    const OpenCommentSection = () => {


        return () => {
            setCommentOpen(true)
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/getImage`,)
            .then(res => setImage(res.data[0].image))
            .catch(err => console.log(err))
    }, [])

    // console.log(  "1 lakh", tweet.createdAt)

    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex items-center gap-2 p-3'>



                    <div className='w-full'>

                        <div className='flex gap-3 w-[45vw] '>

                            <div className='w-[4vw] h-[7vh] '>

                                { tweet?.userDetails && tweet?.userDetails?.map((data, index) => (

                                <img key={index}
                                    className="w-[3vw] h-[3vw] border cursor-pointer rounded-full object-top object-cover"
                                    src={data?.profileImg}
                                    alt=""

                                />
                                ))}
                            </div>


                            <div className=' w-[40vw]'>


                                <div className='flex items-center gap-2'>
                                    <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                                    <p>{tweet?.userDetails[0]?.username} </p>

                                    <p className='text-sm text-slate-500'> {formatDistanceToNow(new Date(tweet?.createdAt), { addSuffix: true })}</p>


                                </div>
                                <div>
                                    <p>{tweet?.description}</p>
                                </div>
                            </div>
                        </div>


                        <div className='flex justify-between my-3'>
                            <div onClick={OpenCommentSection()} className='flex cursor-pointer gap-2 items-center'>
                                <FaRegCommentAlt />
                                <p>{comments?.length}</p>
                            </div>
                            <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='flex gap-2 items-center'>
                                <FaRegHeart className='hover:text-red-600' />
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
                            <div className='w-full  rounded-md border'>
                                <div className='flex items-center gap-5 border-b p-2'>
                                    {/* <FiArrowLeft className="cursor-pointer p-1 hover:bg-slate-200 rounded-full" size="30px" onClick={() => setCommentOpen(false)} /> */}
                                    <IoMdCloseCircle className="cursor-pointer p-1 hover:bg-slate-200 rounded-full" size="34px" onClick={() => setCommentOpen(false)} />


                                    <p className='text-xl'>Comment Section</p>

                                </div>
                                <div className='flex items-center justify-between p-3 mt-7'>
                                    <input value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className='w-[34vw] outline-none bg-slate-100 pl-2 rounded-lg text-xl h-[8vh]' type="text" placeholder='Post your reply' />
                                    <button type='submit' onClick={addCommentHandler}
                                        className='bg-blue-400 py-2 px-10 text-xl rounded-full text-white '>Reply</button>

                                </div>

                                <div className='allcomment p-3 '>
                                    {comments && comments.map((item, index) => (
                                        <div key={index} className='border p-2 hover:bg-slate-50'>
                                            <div className='flex gap-2 justify-between items-center'>

                                                <div className='flex gap-2 items-center'>

                                                    <h3 className='font-semibold text-[17px]'>{item?.userDetails?.name}</h3>
                                                    <p>{item?.userDetails?.username}</p>
                                                    <span className='text-gray-600 text-sm'>
                                                        · {formatDistanceToNow(new Date(item.created), { addSuffix: true })}
                                                    </span>
                                                </div>


                                                {user?._id === item?.userId?._id && (
                                                    <AiOutlineDelete
                                                        className='cursor-pointer text-xl hover:text-red-500'
                                                        onClick={() => deleteCommentHandler(item._id)}
                                                    />
                                                )}

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