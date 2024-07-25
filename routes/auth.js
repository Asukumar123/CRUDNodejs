const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Anime = require('../models/anime');




passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try{
      console.log('recieved credentials',USERNAME,password);
      const user =await Anime.findOne({username:USERNAME});
      if(!user)
        return done(null,false,{message:"incorrect password"});
  
      const isPasswordmatch=user.comparePassword(password);
      if(isPasswordmatch){
        return done(null,user);
      }else{
        return done(null,false,{message:'incorrect password'});
      }
  
  
    }catch (err) {
      return done(err)
  }
  }))

  module.exports =passport;