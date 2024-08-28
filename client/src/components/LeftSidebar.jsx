import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { USER_API_END_POINT } from "../utils/constant";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { MdHomeFilled } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessage } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";





const LeftSidebar = () => {

    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`)
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="fixed top-0 left-0 w-[20%] font-semibold  ml-14 ">

            <div className="text-5xl ml-24">
                <i className="ri-twitter-x-line"></i>
            </div>

            <div className="pt-12 p-10">


                <div className="hover:bg-slate-100 p-2 pl-6 rounded-full">
                    <Link to='/' className="flex items-center text-2xl gap-2" >
                        <MdHomeFilled />
                        <p>Home</p>
                    </Link>

                </div>

                <div className="flex items-center mt-3 text-2xl gap-2 hover:bg-slate-100 p-2 pl-6 rounded-full">
                    <IoMdSearch />
                    <p>Explore</p>
                </div>
                
                <div className="flex items-center mt-3 text-2xl gap-2 hover:bg-slate-100 p-2 pl-6 rounded-full">
                    <IoNotificationsOutline />
                    <p>Notification</p>
                </div>
                <div className="flex items-center mt-3 text-2xl gap-2 hover:bg-slate-100 p-2 pl-6 rounded-full">
                    <BiMessage />
                    <p>Message</p>
                </div>
                <div className="flex items-center mt-3 text-2xl gap-2 hover:bg-slate-100 p-2 pl-6 rounded-full">
                <BsBookmark />

                    <p>Bookmarks</p>
                </div>
                <div >
                    <Link to={`/profile/${user._id}`} className="flex items-center mt-3 text-2xl gap-2 hover:bg-slate-100 p-2 pl-6 rounded-full" >
                        <CgProfile />
                        <p>Profile</p>
                    </Link>

                </div>
                <div onClick={logoutHandler} className="flex items-center cursor-pointer mt-3 text-2xl gap-2 hover:bg-slate-100 p-2 pl-6 rounded-full">
                    <CiLogout />
                    <p>Logout</p>
                </div>
                <div className="flex items-center mt-3 text-2xl gap-2 hover:bg-slate-100 p-2 pl-6 rounded-full">
                    <CiCircleMore />
                    <p>More</p>
                </div>

                <button className="bg-blue-500 text-white mt-6 text-xl px-24 font-bold rounded-full py-3">Post</button>

            </div>

        </div>
    )
}

export default LeftSidebar