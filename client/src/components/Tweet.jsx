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

const Tweet = ({ tweet }) => {

    const { user } = useSelector(store => store.user);
    const [image, setImage] = useState();

    console.log("elon", user)

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


    useEffect(() => {
        axios.get(`http://localhost:8080/getImage`,)
            .then(res => setImage(res.data[0].image))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex items-center gap-2 p-4'>
                    
                    <img
                        className="w-[3vw] h-[3vw] border cursor-pointer rounded-full object-top object-cover"
                        src={`http://localhost:8080/Images/` + image}
                        alt=""

                    />

                    <div className='w-full'>

                        <div className='flex items-center gap-2'>
                            <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                            <p>{tweet?.userDetails[0]?.username}  .1m</p>

                        </div>
                        <div>
                            <p>{tweet?.description}</p>
                        </div>

                        <div className='flex justify-between my-3'>
                            <div className='flex gap-2 items-center'>
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
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Tweet