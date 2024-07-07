import mongoose from "mongoose"
let isConnected:boolean;
export const ConnectToDb =async() =>{
    
    try{
if(isConnected){
    console.log("DataBase is Already Connected")
}else{
    const connect = await mongoose.connect(process.env.MONGO_URL!)
    if(mongoose.connection.readyState){
        console.log("DataBase is just Connected...")
        isConnected = true;
    }
}
    }catch(error){
if(error instanceof Error){
    console.log("Error to Connect DB", error.message);
    throw new Error(error.message)
}else{
    console.log("Unknown Error Occured");
    throw new Error("Unknown Error Occured")
}
    }
}