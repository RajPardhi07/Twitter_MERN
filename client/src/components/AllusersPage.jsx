import axios from "axios";
import { useEffect, useState } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";


const AllusersPage = () => {
    const { user } = useSelector(store => store.user);
    const [allusers, setAllusers] = useState();

    // console.log("allusers",allusers)
    // console.log(user._id)


    useEffect(() => {

        const fetchOtherUsers = async () => {

            try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${user._id}`, {
                    withCredentials: true
                });
                // console.log("lol", res.data.otherusers);
                setAllusers(res.data.otherusers)
            } catch (error) {
                console.log(error)
            }
        }

        fetchOtherUsers();
    }, [])

    return (
        <div>
            <Link to="/" className="absolute p-3 left-10 top-4 bg-black rounded-full">

                <FiArrowLeft className="text-white" size="22px" />
            </Link>
            <div className="w-full h-20 bg-blue-500 flex items-center justify-center">

                <h1 className="text-5xl text-white font-semibold">All Users</h1>
            </div>
            <div className="w-full grid grid-cols-4 grid-rows-4 gap-2 mt-3 rounded-lg">

                {
                    allusers?.map((user) => (
                        <div key={user?._id} className="flex w-[22vw] h-[20vh] hover:bg-slate-100 p-3 m-4 border-2 border-blue-400 rounded-md items-center  mt-3 justify-between">
                            <div className="">
                                <img className="w-14 h-14 object-cover object-top rounded-full" src={user?.profileImg} alt="" />
                                <div>
                                    <h5 className="font-bold text-2xl" >{user?.name}</h5>
                                    <p className="text-slate-500">{user?.username}</p>
                                </div>
                            </div>
                            <Link to={`/profile/${user?._id}`}>

                                <button className="bg-black text-slate-200 px-3 py-1 rounded-full">Profile</button>
                            </Link>
                        </div>
                    ))
                }





            </div>
        </div>
    )
}

export default AllusersPage