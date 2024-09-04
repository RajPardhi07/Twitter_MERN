import axios from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { TWEET_API_END_POINT } from '../utils/constant';
import { getIsActive, getRefresh } from '../redux/tweetSlice';



const CreatePost = () => {
    const [description, setDescription] = useState("");
    const [img, setImg] = useState(null);
    const imgRef = useRef(null);
    const { user, profile } = useSelector(store => store.user);
    console.log("profile", profile?.profileImg)
    const { isActive } = useSelector(store => store.tweet)
    const dispatch = useDispatch();

    const submitHandler = async () => {

        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/createTweet`, { description, id: user?._id, img }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefresh());
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
        setDescription("");
        setImg(null);
    }

    const handleImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            }
            reader.readAsDataURL(file);
        }
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
                    <div className='flex  items-center gap-2 p-4'>

                        <img className='w-11 h-11 object-cover rounded-full' src={profile?.profileImg} alt="" />

                        <input value={description} onChange={(e) => setDescription(e.target.value)}
                            className='w-full outline-none border-none text-lg' type="text" placeholder='What is happening?!' />

                    </div>
                    <div className='flex flex-col items-center justify-between p-4'>
                       

                        {
                            img && (

                                <img src={img} value={img} className='w-full mx-auto h-72 object-contain rounded' />
                            )
                        }


                        <div className='flex w-full items-center justify-between'>
                            <CiImageOn

                                className='fill-primary w-6  text-blue-600 h-6 cursor-pointer'
                                onClick={() => imgRef.current.click()}
                            />

                            <input type='file' accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />

                            <button onClick={submitHandler} type='submit' className='px-4 py-1 text-lg text-white bg-blue-500 border-none rounded-full'>Post</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreatePost