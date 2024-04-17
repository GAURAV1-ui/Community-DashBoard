import { User,IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import { Snowflake } from "nodejs-snowflake";
import { Request, Response } from "express";


const config = {
    custom_epoch: Date.now(),
    instance_id: 4000 
};

const uid = new Snowflake(config);

const registerUser = async(req: Request, res:Response )=> {

    try {
        const { name, email, password } = req.body;

         if(!name && !email && !password){
            return res.status(400).json({message:"All fields are required"});
    }


    const existingUser = await User.findOne({email});

    if(existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }
        const hashedPassword = await bcrypt.hash(password, 10);

        const _id = uid.getUniqueID();

        const user: IUser= new User({
            _id,
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        console.log(user)
    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser) {
        return res.status(400).json({ message: 'User not created' });
    }

    return res.status(201).json(
        createdUser
    );

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser = async(req: Request, res: Response):Promise<any> => {
try {
        const {email, password} = req.body;
        if(!email && !password){
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        const user = await User.findOne({email});
    
        if(!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
    
        const isPasswordValid = bcrypt.compare(password, user.password);
    
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credential' });
        }
        const createdUser = await User.findById(user._id).select(
            "-password"
        )
    
        if(!createdUser) {
            return res.status(400).json({ message: 'User not created' });
        }
    
        return res.status(201).json(
            createdUser
        );
} catch (error) {
    console.log(error);
}

}

export {
    registerUser,
    loginUser
}