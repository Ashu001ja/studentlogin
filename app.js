const express=require('express');
const ConnectDB=require('./db/db');
const router=require('./router/router');
const PORT=process.env.PORT || 8000;

const app=express();
app.use(express.json());

app.use(router);

const Start=async()=>{
    try{
        await ConnectDB();
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }catch(error){
        console.error('Error starting server',error);
    }
};

Start();