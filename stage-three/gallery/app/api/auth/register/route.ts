import { connectDb } from "@/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest, response: NextResponse) => {
    try {
        await connectDb();
        const res = req.json()
        const body = await res;
        const userExists = await User.findOne({email: body.email}).exec();
        if (!userExists) {
            const user = new User({...body});
            await user.save();
            const token = user.generateToken();
            console.log(token);
            
            return NextResponse.json({user},{status: 201})
        }

        return NextResponse.json({message: "User exists"},{status: 400})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: 'Error creating User'},{status: 500})
    }
}