import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
username:{
    type:String,
    required:true
},
followers:{
    type:Array,
    default:[]
},
following:{
    type:Array,
    default:[]
},
work:{
    type:String,

},
location:{
    type:String,
},
myTweet:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tweet",
},
image: {
    type: String,
   
},
bookmarks:{
    type:Array,
    default:[]
}
}, {timestamps:true})


export default mongoose.model("User", userSchema);