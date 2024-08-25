import { Link } from "react-router-dom"





const LeftSidebar = () => {
    return (
        <div className="fixed top-0 left-0 w-[20%] bg-slate-300 font-semibold  ml-14 ">

            <div className="text-5xl ml-24">
                <i className="ri-twitter-x-line"></i>
            </div>

            <div className="pt-12 p-10">


                <div className="hover:bg-slate-200">
                    <Link to='/' className="flex  text-2xl gap-2" >
                        <i className="ri-home-7-line"></i>
                        <p>Home</p>
                    </Link>

                </div>
                <div className="flex mt-7 text-2xl gap-2">
                    <i className="ri-search-line"></i>
                    <p>Explore</p>
                </div>
                <div className="flex mt-7 text-2xl gap-2">
                    <i className="ri-notification-line"></i>
                    <p>Notification</p>
                </div>
                <div className="flex mt-7 text-2xl gap-2">
                    <i className="ri-chat-2-line"></i>
                    <p>Message</p>
                </div>
                <div>
                    <Link to='/profile' className="flex mt-7 text-2xl gap-2" >
                        <i className="ri-user-fill"></i>
                        <p>Profile</p>
                    </Link>

                </div>
                <div className="flex cursor-pointer mt-7 text-2xl gap-2">
                    <i className="ri-logout-circle-line"></i>
                    <p>Logout</p>
                </div>
                <div className="flex mt-7 text-2xl gap-2">
                    <i className="ri-more-fill"></i>
                    <p>More</p>
                </div>

                <button className="bg-blue-500 text-white mt-12 text-xl px-24 font-bold rounded-full py-3">Post</button>

            </div>

        </div>
    )
}

export default LeftSidebar