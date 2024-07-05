import mongoose from "mongoose"
let isConnected:boolean;
export const ConnectToDb =async() =>{
    
    try{
if(isConnected){
    console.log("DataBase is Already Connected")
}else{
    const connect = await mongoose.connect("mongodb+srv://sbinayaraj:LH86NPWTVPBgkA96@cluster0.n3d5lee.mongodb.net/userauthentication?retryWrites=true&w=majority&appName=Cluster0")
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