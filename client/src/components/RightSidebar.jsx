import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
// import Avatar from 'react-avatar';


const RightSidebar = ( otherUsers ) => {
  return (
    


    <div className="fixed top-0 w-full left-[74%] p-5 h-[100vh] bg-white">
      <div className="w-full h-[9vh]">
        {/* <input className="w-[18vw] h-[6vh] bg-slate-100 rounded-full pl-3" type="text" placeholder="Search" /> */}

        <div className="p-2 bg-gray-200 rounded-full w-[20vw] flex items-center">
          <CiSearch size="20px" className="text-gray-500" />

          <input type="text" placeholder="Search" className="bg-transparent px-2 outline-none" />
        </div>

      </div>

      <div className="w-[20vw] h-[40vh] p-1 bg-gray-200 rounded-lg">
        <p className="text-xl font-semibold ml-1 mt-1">You Might Like</p>

        {
        otherUsers?.map((user) => (
          <div key={user?._id} className="flex items-center mt-5 justify-between">
            <div className="flex items-center">
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
        ))}

        {/* <div className="flex items-center mt-5 justify-between">
          <div className="flex items-center">
            <img className="w-10 h-10 object-cover object-center rounded-full" src="https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/05/Top-Gun-Maverick-TC.jpg" alt="" />
            <div>
              <h5 className="font-bold">Tom Cruise</h5>
              <p className="text-slate-500">@tomcruise</p>
            </div>
          </div>
          <button className="bg-black text-slate-200 px-3 py-1 rounded-full">FOLLOW</button>
        </div>
        <div className="flex items-center mt-5 justify-between">
          <div className="flex items-center">
            <img className="w-10 h-10 object-cover object-top rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Homi_Jehangir_Bhabha_1960s.jpg/330px-Homi_Jehangir_Bhabha_1960s.jpg" alt="" />
            <div>
              <h5 className="font-bold">Homi Bhabha</h5>
              <p className="text-slate-500">@homibhabha</p>
            </div>
          </div>
          <button className="bg-black text-slate-200 px-3 py-1 rounded-full">FOLLOW</button>
        </div> */}

      </div>

      <div className="w-[20vw] p-1 h-[45vh] bg-gray-200 mt-5 rounded-lg">
        <p className="text-xl font-semibold ml-1 mt-2">What Happening</p>


        <div className="flex items-center p-1 mt-5 justify-between leading-5">
          <div>
            <p>Sport · Trending</p>
            <h5>#TeamIndia</h5>
            <p>46.7k posts</p>
          </div>
          <div>
            <i className="ri-more-fill"></i>

          </div>
        </div>

        <div className="flex items-center p-1 mt-5 justify-between leading-5">
          <div>
            <p>Event · Trending</p>
            <h5>#Neerajchopra</h5>
            <p>876.7k posts</p>
          </div>
          <div>
            <i className="ri-more-fill"></i>

          </div>
        </div>
        <div className="flex items-center p-1 mt-5 justify-between leading-5">
          <div>
            <p>Car · Trending</p>
            <h5>#Ferrari</h5>
            <p>1.1m posts</p>
          </div>
          <div>
            <i className="ri-more-fill"></i>

          </div>
        </div>


      </div>
    </div>
  )
}

export default RightSidebar