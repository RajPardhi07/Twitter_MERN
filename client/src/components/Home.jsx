import { useSelector } from "react-redux"
import Feed from "./Feed"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import useOtherUsers from "../hooks/useOtherUsers"
import useGetMyTweets from "../hooks/useGetMyTweets"

const Home = () => {

    const { user , otherUsers} = useSelector(store => store.user);

    console.log("rajj",)

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);
    //custom Hook

    useOtherUsers(user?._id);
    useGetMyTweets(user?._id);


    return (
        <div className="flex justify-between  mx-auto w-[70%]">
            <LeftSidebar />
            <Feed />

            <RightSidebar otherUsers={otherUsers} />
        </div>
    )
}

export default Home