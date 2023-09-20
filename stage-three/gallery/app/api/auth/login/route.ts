import { connectDb } from "@/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";



export const POST = async (req: any) => {
    const datas = await req.json();
    
   try {
        await connectDb();
        const userExists = await User.findOne({email: datas.email});
        if (!userExists) {
            return NextResponse.json({message:"Invalid Credentials"},{status:400});
        }else {
            if(bcrypt.compareSync(datas.password,userExists.password_hash)) {
                const token = jwt.sign({sub:userExists._id},""+ process.env.JWT_SECRET,{expiresIn: "7d"});
                const data  = {
                    email: datas.email,
                    token: token,
                    user_id: userExists._id.toString(),
                }
                return NextResponse.json(data,{status: 200})
            } else {
                return NextResponse.json({message:"Invalid Credentials"},{status:400});
            }
           
        } 
       
   } catch (error) {
       console.log(error);
       return new Response("Failed to Validate User",{status: 500})
   }
};

