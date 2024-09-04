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
import { MdEdit, MdOutlineWorkOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";


const Profile = () => {
    const { user, profile } = useSelector(store => store.user)
    const [allMyTweet, setAllMyTweet] = useState();
    const [image, setImage] = useState();
    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    let userId = user?._id
    console.log(userId)
    const { id } = useParams();
    const navigate = useNavigate();
    useGetProfile(id);
    const dispatch = useDispatch();

    console.log("allMyTweet", allMyTweet)

    // console.log("profileImg", profileImg)

    const isMyProfile = user?._id === id;

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const response = axios.get(`${USER_API_END_POINT}/profile/${id}`);
    //             console.log("fetchProfile", response)
    //             setCoverImg(response.data.coverImg);
    //             setProfileImg(response.data.profileImg);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     fetchProfile();
    // }, [id])


    const handleImgChange = async (e, state) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const imageBase64 = reader.result;
                if (state === "coverImg") {
                    setCoverImg(imageBase64); // Update cover image state immediately
                } else if (state === "profileImg") {
                    setProfileImg(imageBase64); // Update profile image state immediately
                }

                try {
                    const response = await axios.post(
                        `${USER_API_END_POINT}/updateProfile/${user?._id}`,
                        {
                            [state]: imageBase64, // Send the updated image data
                        }
                    );
                    toast.success("Image updated successfully!");
                } catch (error) {
                    toast.error("Failed to update image");
                    console.log(error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

   

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

                    <div className="w-full relative border-b h-[70vh]">

                        <img
                            src={profile?.coverImg || "/tweetcover.jpg"}
                            className="h-52 w-full object-cover object-center"
                            alt="cover image"
                        />

                        <div onClick={() => coverImgRef.current.click()}
                            className="absolute top-[4%] bg-slate-500  p-2 rounded-full left-[92%]">

                            <MdEdit className="w-5  h-5 text-white" />
                        </div>


                       

                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            ref={coverImgRef}
                            onChange={(e) => handleImgChange(e, "coverImg")}
                        />




                        <div className="flex px-5 justify-between">
                            <div>
                                <h2 className="text-4xl font-bold">{profile?.name}</h2>
                                <h4 className="text-xl text-slate-700 mt-1">{profile?.username}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <MdOutlineWorkOutline size="20px" />


                                    <p className="text-xl">{profile?.work}</p>


                                </div>
                                <p className="text-slate-600 mt-1">{profile?.bio}</p>
                            </div>



                            <div className="w-32 -mt-20 rounded-full absolute left-[78%] group/avatar">
                                <img
                                    src={profile?.profileImg || "/avatar-placeholder.png"}
                                    className="rounded-full w-32 h-32 object-cover object-top"
                                    alt="profile"
                                />
                                <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                                    {isMyProfile && (
                                        <MdEdit
                                            className="w-4 h-4 text-white"
                                            onClick={() => profileImgRef.current.click()}
                                        />
                                    )}
                                </div>
                            </div>

                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                ref={profileImgRef}
                                onChange={(e) => handleImgChange(e, "profileImg")}
                            />

   




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
                        <h4 className="text-3xl text-center font-bold uppercase">All My Post</h4>



                    </form>

                    <div className="mt-5 border-t">
                        {/* <h4 className="text-2xl  mb-4">Your Tweets</h4> */}


                        <div>
                            {isMyProfile && allMyTweet?.map((tweet, index) => {

                                const date = new Date(tweet?.createdAt);
                                const options = { year: 'numeric', month: 'short', day: '2-digit' };
                                const formattedDate = date.toLocaleDateString('en-US', options);
                                return (
                                    <div className="border-b p-2 hover:bg-slate-100 transition-all" key={index}>
                                        <div className="flex gap-1">


                                            <img
                                                className="w-[3vw] h-[3vw] border cursor-pointer rounded-full object-top object-cover"
                                                src={profile?.profileImg}
                                                alt=""

                                            />
                                            <h3 className="font-semibold">{profile?.name}</h3>
                                            <p className="text-slate-600">{profile?.username}</p>
                                            · <p className="text-slate-600">{formattedDate}</p>
                                        </div>
                                        <div className="p-3">

                                            <p>{tweet?.description}</p>
                                            <div className='w-full mt-3 bg-red-300'>
                                                <img className='w-full h-full object-cover' src={tweet?.img} alt="" />

                                            </div>
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