"use server";
import { createConnection } from "../../db/db";
import { NextResponse } from "next/server";
import Vendor from "../../models/vendors.models";


export const POST = async (request)=>{
    try{
        await createConnection();
        let formData =await request.json();
        await Vendor.create(formData);
        return NextResponse.json({message:"Vendor successfully Added"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Vendors"},{status:500})
    }
}

export const GET = async (request)=>{
    try{
        await createConnection();
        const result_date = await Vendor.find();
        return NextResponse.json({data:result_date},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Vendors"},{status:500});
    }
}