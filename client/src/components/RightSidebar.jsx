import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import { useSelector } from "react-redux";
// import Avatar from 'react-avatar';


const RightSidebar = () => {

  const { user } = useSelector(store => store.user);
  const [allusers, setAllusers] = useState();
  const [visibleUsers, setVisibleUsers] = useState(5);

  // console.log("allusers",allusers[0]?.profileImg)
  // console.log(user._id)


  useEffect(() => {

    const fetchOtherUsers = async () => {

      try {
        const res = await axios.get(`${USER_API_END_POINT}/otheruser/${user._id}`, {
          withCredentials: true
        });
        // console.log("lol", res.data.otherusers);
        setAllusers(res?.data?.otherusers)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOtherUsers();
  }, [])

  // const handleSeeMore = () => {
  //   setVisibleUsers((prevVisible) => prevVisible + 5);
  // }


  return (



    <div className="fixed top-0 hidden lg:block w-full left-[74%] p-5  bg-white">
      <div className="w-full h-[9vh]">
        {/* <input className="w-[18vw] h-[6vh] bg-slate-100 rounded-full pl-3" type="text" placeholder="Search" /> */}

        <div className="p-2 bg-gray-100 rounded-full w-[20vw] flex items-center">
          <CiSearch size="20px" className="text-gray-500" />

          <input type="text" placeholder="Search" className="bg-transparent px-2 outline-none" />
        </div>

      </div>




      <div className="w-[20vw]  py-3 p-1 bg-gray-100 rounded-lg">
        <p className="text-xl font-semibold ml-1 mt-1">You Might Like</p>

        {
          allusers?.slice(0, visibleUsers)?.map((user) => (
            <div key={user?._id} className="flex items-center p-1 mt-5 justify-between">
              <div className="flex items-center">
                <img className="w-10 h-10 object-cover rounded-full" src={user?.profileImg} alt="" />
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


        <Link to='/allusers'>

          <button className="bg-gray-800 text-white px-3 py-1 rounded-full mt-3"
          >
            See More
          </button>
        </Link>




      </div>



    </div>
  )
}

export default RightSidebar