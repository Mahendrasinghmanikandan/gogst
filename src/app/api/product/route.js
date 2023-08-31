"use server";
import { createConnection } from "../../db/db";
import { NextResponse } from "next/server";
import Product from "../../models/product.model";


export const POST = async (request)=>{
    try{
        await createConnection();
        let formData =await request.json();
        await Product.create(formData);
        return NextResponse.json({message:"Product successfully Added"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Products"},{status:500})
    }
}

export const GET = async (request)=>{
    try{
        await createConnection();
        const result_date = await Product.find();
        return NextResponse.json({data:result_date},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Failed to Add Products"},{status:500});
    }
}