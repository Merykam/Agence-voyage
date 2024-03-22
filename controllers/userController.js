const User = require('../models/user');



 

const getAllusers = async (req,res)=>{
       
        

        try{

            const users = await User.find();
    

            res.json({ success: true, message:  users});

        }catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

   }


   const updateUserStatus = async (req,res)=>{
    const { id } = req.params;
        

    try{
       const findUser = await User.find({_id:id});
       const findRole = findUser[0].role;
       console.log("thus iss role"+findRole);
       if(findRole=="1"){

        const users = await User.findByIdAndUpdate(id, {role : "0"});
        return res.json({ success: true, message:  "status updates successfully"});



       }else{
        const users = await User.findByIdAndUpdate(id, {role : "1"});
        return res.json({ success: true, message:  "status updates successfully"});

       }


      
       
      
       

       


    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

}
   module.exports={
    getAllusers,
    updateUserStatus
   }