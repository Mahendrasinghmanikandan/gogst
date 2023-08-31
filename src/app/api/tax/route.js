"use server";
import { createConnection } from "../../db/db";
import { NextResponse } from "next/server";
import Tax from "../../models/tax.model";


export const POST = async (request)=>{
    try{
        await createConnection();
        let formData =await request.json();
        await Tax.create(formData);
        return NextResponse.json({message:"Tax successfully Added"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Taxs"},{status:500})
    }
}

export const GET = async (request)=>{
    try{
        await createConnection();
        const result_date = await Tax.find();
        return NextResponse.json({data:result_date},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Taxs"},{status:500});
    }
}