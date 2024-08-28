import axios from 'axios';
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { FaRegBookmark } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { TWEET_API_END_POINT } from '../utils/constant';
import { getRefresh } from '../redux/tweetSlice';
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from 'react';

const Tweet = ({ tweet }) => {

    const { user } = useSelector(store => store.user);
    const [image, setImage] = useState();

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
                    {/* <Avatar src="https://plus.unsplash.com/premium_photo-1724076827133-593437b8f16a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                        size="50" className='object-cover' round={true} /> */}

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
                            <div className='flex gap-2 items-center'>
                                <FaRegBookmark />
                                <p>0</p>
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