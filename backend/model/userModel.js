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
bookmarks:{
    type:Array,
    default:[]
}
}, {timestamps:true})


export default mongoose.model("User", userSchema);