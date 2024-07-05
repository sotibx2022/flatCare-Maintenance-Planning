import { NextResponse } from "next/server";

export async function POST(response:NextResponse){
    try{
        let response = NextResponse.json({message:"User Logout Successfully",
            status:200,
            success:true

        })
        response.cookies.set("token","",{httpOnly:true,
            expires: new Date(0),
            path:'/'
        })
        
        return response;
    }catch(error){

    }
}