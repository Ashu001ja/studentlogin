const StudentSchema=require('../model/model');
const bcrypt=require('bcrypt');
const Studentsignup=async (req,res)=>{
try{
    const {sname,fname,mobilenumber,fmobilenumber,emailID,coursstartyear,collegename,department,course,collegerollnumber,urollnumber,selectsemester,country,state,city,password}=req.body;
    const user=await StudentSchema.findOne({emailID});
    if(user){
        return res.status(400).json({msg:'User already exists'});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const newUser=new StudentSchema({
        sname,fname,mobilenumber,fmobilenumber,emailID,coursstartyear,collegename,department,course,collegerollnumber,urollnumber,selectsemester,country,state,city,password:hashedpassword
    });
    await newUser.save();
    res.status(201).json({msg:'User registered successfully'});
}catch(err){
    console.log(err);
    return res.status(500).json({msg:err.message});
}
};

const Studentlogin=async (req,res)=>{
    try{
        const {emailID,password}=req.body;
        const user=await StudentSchema.findOne({emailID});
        if(!user){
            return res.status(400).json({msg:'User not found'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        res.json({msg:'User logged in successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:err.message});
    }
};

const GetstudentData=async (req,res)=>{
    try{
        const studentData=await StudentSchema.findOne({emailID:req.params.email});
        if(!studentData){
            return res.status(404).json({msg:'User not found'});
        }
        res.json(studentData);
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:err.message});
    }
}; 

const changepassword=async (req,res)=>{
    try{
        const {emailID,oldpassword,newpassword}=req.body;
        const user=await StudentSchema.findOne({emailID});
        if(!user){
            return res.status(400).json({msg:'User not found'});
        }
        const isMatch=await bcrypt.compare(oldpassword,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(newpassword,salt);
        user.password=hashedpassword;
        await user.save();
        res.json({msg:'Password changed successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:err.message});
    }
};

const findeuser=async (req,res)=>{
    try{
        const {emailID}=req.body;
        const user=await StudentSchema.findOne({emailID});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User found'});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg:err.message});
    }
};

const forgotpassword=async (req,res)=>{
    try{
      const {emailID,newpassword}=req.body;
      const user=await StudentSchema.findOne({emailID});
      if(!user){
        return res.status(404).json({msg:'User not found'});
      }
      const salt=await bcrypt.genSalt(10);
      const hashedpassword=await bcrypt.hash(newpassword,salt);
      user.password=hashedpassword;
      await user.save();
      res.json({msg:'Password reset successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:err.message});
    }           
};
module.exports={Studentsignup,Studentlogin,GetstudentData,changepassword,findeuser,forgotpassword};
