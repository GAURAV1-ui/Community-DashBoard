import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document {
    _id:string;
    name: string;
    email: string;
    password: string;
}


const userSchema:Schema = new Schema(
    {
        _id: {
            type:String
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