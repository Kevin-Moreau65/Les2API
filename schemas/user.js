import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const userSchema = new Schema({
    pseudo : {required : true, type : String} ,
    pwd : {required : true, type : String}
  }); 
  
const user = mongoose.model("User",userSchema)


export default user