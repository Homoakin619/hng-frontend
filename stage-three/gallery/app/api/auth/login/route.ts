import { connectDb } from "@/database";
import User from "@/models/User";
import { NextResponse } from "next/server";



export const POST = async (req: any) => {
    const data = await req.json();
    
   try {
        await connectDb();
        const userExists = await User.findOne({email: data.email})
        if (userExists) {
            if(!userExists || !userExists.matchPassword(data.password)) {
                console.log('failed login');
                
                return NextResponse.json({message: "Error Validating User"})
            } else {        
                console.log('success login');
                
                const token = userExists.generateToken();
                const datas = {
                    ...userExists.toJSON(),token
                }
                return NextResponse.json({...datas},{status:200})
            }
        }else {
            console.log('no user');
            return NextResponse.json({message: "User does not exist"},{status:400})
        }       
       
   } catch (error) {
       console.log(error);
       return new Response("Failed to Validate User",{status: 500})
   }
};

