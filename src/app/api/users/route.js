import { NextResponse } from "next/server";
import { connectDB } from "../../../../DB/db";
import { User } from "../../../../models/user.model";


export async function GET(){
    try {
        await connectDB();
        let users = await User.find();
        return NextResponse.json({users})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"internal server error"},{status:400});
    }
} 