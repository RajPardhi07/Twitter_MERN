import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
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

    // const [activeItem, setActiveItem] = useState(null);

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



    const activeClassName = "shadow-black/10 shadow-md text-yellow-400";
    const baseClassName = "flex items-center mt-3 text-2xl gap-2 rounded-full hover:shadow-md shadow-slate/10 px-5 py-2";



    return (
        <div className="fixed lg:top-0 lg:left-0 bottom-0 -left-14 lg:w-[20%] w-[100%] font-semibold  ml-14 ">

            <div className="text-5xl ">
                {/* <i className="ri-twitter-x-line"></i> */}
                            <img className='hidden lg:block  h-11 mt-2 ml-24 object-cover' src="https://logolook.net/wp-content/uploads/2021/06/Twitter-Log%D0%BE.png" alt="" />

            </div>

            <div className="pt-8 lg:p-10 p-3 flex lg:flex-col">


                <div>


                    <NavLink to="/" className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : ""}`}>
                        <MdHomeFilled />
                        <p className="hidden lg:block">Home</p>
                    </NavLink>
                </div>



                <NavLink to="/explore" className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : ""}`}>
                    <IoMdSearch />
                    <p className="hidden lg:block">Explore</p>
                </NavLink>

                <NavLink to="/notification" className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : ""}`}>
                    <IoNotificationsOutline />
                    <p className="hidden lg:block">Notification</p>
                </NavLink>
                <NavLink to="/message" className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : ""}`}
                >
                    <BiMessage />
                    <p className="hidden lg:block">Message</p>
                </NavLink>
                <NavLink to={`/bookmarks/${user?._id}`} className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : ""}`}
                >
                    <BsBookmark />

                    <p className="hidden lg:block">Bookmarks</p>
                </NavLink>
                <div >
                    <NavLink className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : ""}`}
                        to={`/profile/${user?._id}`}
                    >
                        <CgProfile />
                        <p className="hidden lg:block">Profile</p>
                    </NavLink>

                </div>
                <div onClick={logoutHandler}
                    className="flex items-center cursor-pointer mt-3 text-2xl gap-2 rounded-full hover:shadow-md shadow-slate/10 px-5 py-2">
                    <CiLogout />
                    <p className="hidden lg:block">Logout</p>
                </div>
                <NavLink to="/more" className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : ""}`}
                >
                    <CiCircleMore />
                    <p className="hidden lg:block">More</p>
                </NavLink>

                <button className="bg-blue-500 hidden lg:block text-white mt-6 text-xl px-24 font-bold rounded-full py-3">Post</button>

            </div>

        </div>
    )
}

export default LeftSidebar