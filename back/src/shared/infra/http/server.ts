import "reflect-metadata"
import "dotenv/config"


import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "@data";

import { AppError } from "@shared/infra/errors/AppError";
import { router } from "./routes";

import "@shared/container";

const app = express();
app.use(express.json());


app.use(router)

app.use((err:Error,request:Request,response:Response,next:NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message:err.message})
    }

    return response.status(500).json({
        status:"error",
        message:`nternal server error - ${err.message}`

    })
})

AppDataSource.initialize().then(()=>{
    app.listen(3333, () => console.log("Server rodando"));

})
