import { Link, useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import toast from "react-hot-toast";
import axios from "axios";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import { GoArrowLeft } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineWorkOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";


const Profile = () => {
    const { user, profile } = useSelector(store => store.user)
    const [allMyTweet, setAllMyTweet] = useState();
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();


    // const handleUpload = () => {

    //     const formdata = new FormData()
    //     formdata.append('file', file)
    //     axios.post(`http://localhost:8080/upload/${user?._id}`, formdata)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }


    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post(`http://localhost:8080/upload/${user?._id}`, formData)
            .then((res) => {
                console.log(res);
                setImage(res.data.fileName); // Set the image to the newly uploaded image
                toast.success("Profile picture updated successfully!");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to upload image");
            });
    };


    useEffect(() => {
        axios.get(`http://localhost:8080/getImage`,)
            .then(res => setImage(res.data[0].image))
            .catch(err => console.log(err))
    }, [])

    const handleEdit = () => {
        navigate(`/edit/${id}`)

    }

    useEffect(() => {
        const myAllTweet = async () => {
            try {
                const response = await axios.get(`${TWEET_API_END_POINT}/mytweet/${user?._id}`)
                console.log("response", response.data.myTweets)
                setAllMyTweet(response.data.myTweets)
            } catch (error) {
                console.log(error)
            }
        }
        myAllTweet();
    }, [])


    const followAndUnfollowHandler = async () => {
        if (user.following.includes(id)) {
            //unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id });
                console.log(res)
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error)
            }
        } else {
            //follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id });
                console.log(res)
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error)
            }
        }
    }



    return (

        <div>

            <LeftSidebar />


            <div className=" mx-auto w-[70%] flex ml-[24%]">


                <div className="w-[71%] border">
                    <div className="w-full h-[10vh] text-2xl flex items-center p-3 gap-6">
                        <Link to='/'>
                            <GoArrowLeft />

                        </Link>
                        <p className="font-extrabold">{profile?.name}</p>
                    </div>

                    <div className="w-full border-b h-[70vh]">
                        <div
                            style={{
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1722851448925-f6cf5cc8da77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                            }}
                            className="w-full h-[30vh] bg-cover bg-center bg-red-300"
                        ></div>

                        <div className="flex px-5 justify-between">
                            <div>
                                <h2 className="text-4xl font-bold">{profile?.name}</h2>
                                <h4 className="text-xl text-slate-700">{profile?.username}</h4>
                                <div className="flex items-center gap-2">
                                    <MdOutlineWorkOutline size="20px" />


                                    <p className="text-xl">{profile?.work}</p>
                                </div>
                            </div>

                            <div className="-mt-16">
                                <img className="w-[10vw] h-[10vw] border cursor-pointer rounded-full object-top object-cover"
                                    src={`http://localhost:8080/Images/` + image} alt=""
                                    onClick={() => fileRef.current.click()} />
                                <input ref={fileRef} type="file" hidden onChange={e => setFile(e.target.files[0])} />
                                <button className="bg-blue-500" onClick={handleUpload}>Upload</button>

                            </div>


                        </div>

                        <div className="flex items-center gap-2 text-xl ml-5 mt-7">
                            <CiLocationOn />
                            <p>{profile?.location}</p>
                        </div>

                        <div className="flex mt-4 px-5 items-center justify-between">
                            <div className="flex gap-5 text-xl">
                                <p>
                                    <span className="font-bold">{profile?.followers?.length}</span> Followers
                                </p>
                                <p>
                                    <span className="font-bold">{profile?.following?.length}</span> Following
                                </p>
                            </div>

                            {
                                profile?._id === user?._id ? (
                                    <button onClick={() => handleEdit(profile?.id)} className="px-6 py-2 text-xl rounded-full border">Edit Profile</button>

                                ) : (
                                    <button onClick={followAndUnfollowHandler} className="px-6 py-2 text-xl rounded-full border">{user.following.includes(id) ? "Following" : "Follow"}</button>

                                )
                            }


                        </div>
                    </div>

                    <form className="mt-3">
                        <h4 className="text-xl uppercase">All My Post</h4>



                    </form>

                    <div className="mt-5 border-t">
                        <h4 className="text-2xl font-bold mb-4">Your Tweets</h4>


                        <div>
                            {allMyTweet?.map((tweet, index) => {

                                const date = new Date(tweet?.createdAt);
                                const options = { year: 'numeric', month: 'short', day: '2-digit' };
                                const formattedDate = date.toLocaleDateString('en-US', options);
                                return (
                                    <div className="border-b p-2 hover:bg-slate-100 transition-all" key={index}>
                                        <div className="flex gap-1">


                                            <img
                                                className="w-[3vw] h-[3vw] border cursor-pointer rounded-full object-top object-cover"
                                                src={`http://localhost:8080/Images/` + image}
                                                alt=""

                                            />
                                            <h3 className="font-semibold">{profile?.name}</h3>
                                            <p className="text-slate-600">{profile?.username}</p>
                                            · <p className="text-slate-600">{formattedDate}</p>
                                        </div>
                                        <div className="p-3">

                                            <p>{tweet?.description}</p>
                                        </div>
                                        <div className="flex items-center px-2 m-2 justify-between">

                                            <div className="flex items-center gap-2">
                                                <FaRegCommentAlt />
                                                <p>0</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <FaRegHeart />
                                                <p>{tweet?.like?.length}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <AiOutlineDelete />

                                            </div>


                                        </div>
                                    </div>
                                )
                            })}
                        </div>



                    </div>

                </div>


            </div>


            <RightSidebar />

        </div>
    )
}

export default Profile