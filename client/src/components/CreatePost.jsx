import axios from 'axios';
import { useState } from 'react';
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { TWEET_API_END_POINT } from '../utils/constant';
import { getIsActive, getRefresh } from '../redux/tweetSlice';



const CreatePost = () => {
    const [description, setDescription] = useState("");
    const { user } = useSelector(store => store.user);
    console.log("create",user)
    const { isActive } = useSelector(store => store.tweet)
    const dispatch = useDispatch();

    const submitHandler = async () => {

        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/createTweet`, { description, id:user?._id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setDescription("");
    }

    const forYouHandler = () => {
        dispatch(getIsActive(true));
    }

    const followingHandler = () => {
        dispatch(getIsActive(false));
    }

    return (
        <div className="w-[100%] ">
            <div>
                <div className="flex items-center border-b justify-between">
                    <div onClick={forYouHandler} className={` ${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer w-full hover:bg-slate-300 px-4 py-3`}>
                        <h1 className="font-bold text-center text-lg text-gray-600">For You</h1>
                    </div>
                    <div onClick={followingHandler} className={` ${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer w-full hover:bg-slate-300 px-4 py-3`}>
                        <h1 className="font-bold text-lg text-center text-gray-600">Following</h1>
                    </div>
                </div>
                <div className='border-b'>
                    <div className='flex items-center gap-2 p-4'>
                        <Avatar src="https://plus.unsplash.com/premium_photo-1724076827133-593437b8f16a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                            size="50" className='object-cover' round={true} />

                        <input value={description} onChange={(e) => setDescription(e.target.value)}
                            className='w-full outline-none border-none text-lg' type="text" placeholder='What is happening?!' />

                    </div>
                    <div className='flex items-center justify-between p-4'>
                        <div>
                            <CiImageOn />

                        </div>

                        <button onClick={submitHandler} type='submit' className='px-4 py-1 text-lg text-white bg-blue-500 border-none rounded-full'>Post</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreatePost