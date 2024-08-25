import CreatePost from "./CreatePost"
import Tweet from "./Tweet"

const Feed = () => {
  return (
    <div className="w-[70%] ml-[14%] border">
        <CreatePost/>
        <Tweet/>
    
    </div>
  )
}

export default Feed