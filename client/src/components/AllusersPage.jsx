import axios from "axios";
import { useEffect, useState } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
            <div className="w-full grid grid-cols-4 grid-rows-4 gap-2 rounded-lg">

                {
                    allusers?.map((user) => (
                        <div key={user?._id} className="flex w-[22vw] h-[20vh] hover:bg-slate-100 p-3 m-4 border border-gray-400 rounded-md items-center  mt-3 justify-between">
                            <div className="">
                                <img className="w-10 h-10 object-cover rounded-full" src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg" alt="" />
                                <div>
                                    <h5 className="font-bold">{user?.name}</h5>
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