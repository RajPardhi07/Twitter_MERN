import { useSelector } from "react-redux"
import CreatePost from "./CreatePost"
import Tweet from "./Tweet"

const Feed = () => {
  const { tweets } = useSelector(store => store.tweet);
  return (
    <div className="w-[70%] ml-[14%] border">
      <CreatePost />
      {
        tweets?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet} />)
      }


    </div>
  )
}

export default Feed