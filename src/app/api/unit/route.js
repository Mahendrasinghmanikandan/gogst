"use server";
import { createConnection } from "../../db/db";
import { NextResponse } from "next/server";
import Unite from "../../models/units.model";


export const POST = async (request)=>{
    try{
        await createConnection();
        let formData =await request.json();
        await Unite.create(formData);
        return NextResponse.json({message:"Unite successfully Added"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Unites"},{status:500})
    }
}

export const GET = async (request)=>{
    try{
        await createConnection();
        const result_date = await Unite.find();
        return NextResponse.json({data:result_date},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Unites"},{status:500});
    }
}