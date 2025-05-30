import mongoose from "mongoose";

const MONGODB_URI= process.env.MONGO_URI
if(!MONGODB_URI){
    throw new Error('please define the Mongo Db URI ')
}
let cached=(global as any).mongoose

if(!cached){
    cached= (global as any).mongoose = {conn: null , promise:null}

}

async function dbConnect(){
    if(cached.conn)return cached.conn;

    if(!cached.promise){
        cached.promise=mongoose.connect(MONGODB_URI,{
            dbName:'blanksheet',
            bufferCommands:false,
        }).then((mongoose)=>mongoose)
    }
    cached.conn = await cached.promise;

    return cached.conn
}
export default dbConnect