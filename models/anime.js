
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');

const AnimeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  username:{
    required:true,
    type:String
},
password:{
    required:true,
    type:String
}
 
});

AnimeSchema.pre('save',async function(next){
  const Anime=this;
  // agar modify hoga ya naya create hoga
  if(!Anime.isModified('password')) return next();
  try{
    const salt=await bcrypt.genSalt(10);

    const hashedPassword=await bcrypt.hash(Anime.password,salt)

    Anime.password=hashedPassword;
   next();
  }catch(err){
return next(err);
  }
});

AnimeSchema.methods.comparePassword=async function(candidatePassword){
  try {
    const isMatch=await bcrypt.compare(candidatePassword,this.password);
     return isMatch;
  } catch (error) {
    throw err;
  }
}

module.exports = mongoose.model('Anime', AnimeSchema);
