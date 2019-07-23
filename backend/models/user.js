const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
  email:{type:String,required:true},
  followings:[
    {
     following: {type:mongoose.Schema.Types.ObjectId,ref:'User'  },
     friendName:{type:String}
    }
  ],
  followers:[
    {
     follower:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
     friendName:{type:String}
    }
  ],notifications:[{
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    //receiverId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    senderName:{type:String},
    message:{type:String},
    viewProfile:{type:Boolean,default:false},
    createdOn:{type:Date,default:Date.now()},
    read:{type:Boolean,default:false},
    date:{type:String,default:""}
  }],
  chattList:[{
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    mesId:{type:mongoose.Schema.Types.ObjectId,ref:'Message'}
  }]
})
module.exports=mongoose.model('User',userSchema)
