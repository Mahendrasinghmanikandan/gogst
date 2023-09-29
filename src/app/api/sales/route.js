"use server";
import { NextResponse } from "next/server";
import Sales from "../../models/sales.model";
import { createConnection } from "@/app/db/db";



export const POST = async (request)=>{
    try{
        await createConnection();
        let formData =await request.json();
        await Sales.create(formData);
        return NextResponse.json({message:"Vendor successfully Added"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Vendors"},{status:500})
    }
}

export const GET = async (request)=>{
    try{
        await createConnection();
        let data =  await Sales.find();
        return NextResponse.json({data:data},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Vendors"},{status:500})
    }
}

export const PUT = async (request)=>{
    try{
        await createConnection();
        let formData =await request.json();
        await Sales.findByIdAndDelete({_id:formData.id})
        return NextResponse.json({message:"Vendor successfully Added"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Vendors"},{status:500})
    }
}