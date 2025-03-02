import { NextResponse } from "next/server";
import { User } from "../../../../../models/user.model";

export async function GET(req,content){
    try {
        let params = await content.params;
        if(!params.user){
            return NextResponse.json({error:"user id not found !"},{status:404})
        }
        let user = await User.findOne({_id:params.user});
        if(!user){
            return NextResponse.json({error:"user  not found !"},{status:404})
        }
        return NextResponse.json({user});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"internal server error"},{status:400})
    }
}