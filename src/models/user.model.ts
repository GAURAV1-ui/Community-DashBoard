import mongoose,{Schema,Document} from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

export interface IUser extends Document {
    _id:string;
    name: string;
    email: string;
    password: string;
}

const timestamp = new Date();


const userSchema:Schema = new Schema(
    {
        _id: {
            type:String,
            required: true,
            default: Snowflake.generate({timestamp, shard_id: 12444}),
        },
        name: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
    },
    },
    {
        _id: false,
        timestamps: true
    }
    
)

export const User = mongoose.model<IUser>("User", userSchema)