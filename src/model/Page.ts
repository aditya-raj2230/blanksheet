import mongoose, { models, Schema } from "mongoose";

export interface IPage extends Document{
    id:String,
    text:String,
}

const PageSchema: Schema = new Schema({
    id:{type:String,required: true,unique:true},
    text:{type:String,required:true}

})

export default models.Page || mongoose.model<IPage>('Page',PageSchema)