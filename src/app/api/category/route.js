"use server";
import { createConnection } from "../../db/db";
import { NextResponse } from "next/server";
import Category from "../../models/category.model";


export const POST = async (request)=>{
    try{
        await createConnection();
        let formData =await request.json();
        await Category.create(formData);
        return NextResponse.json({message:"Category successfully Added"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Categorys"},{status:500})
    }
}

export const GET = async (request)=>{
    try{
        await createConnection();
        const result_date = await Category.find();
        return NextResponse.json({data:result_date},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Categorys"},{status:500});
    }
}