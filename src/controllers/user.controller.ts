import { User,IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';



const generateToken = async(userId:string, name:string, email:string) => {
    const PayLoad = {
        userId,
        name,
        email
    }
    const secretKey = process.env.SECRET_KEY|| "";

    const token = await jwt.sign(PayLoad,secretKey,{expiresIn: '10h'})
    return token;

}

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

        const user: IUser= new User({
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
        const loggedInUser = await User.findById(user._id).select(
            "-password"
        )
    
        if(!loggedInUser) {
            return res.status(400).json({ message: 'User not created' });
        }

        const token = await generateToken(loggedInUser._id, loggedInUser.password, loggedInUser.email)
        console.log(token)

        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res.status(201)
        .cookie("token", token, options)
        .json(
            {
                loggedInUser,
                token
            }
        );
} catch (error) {
    console.log(error);
}

}

const getUser = async(req:Request, res: Response) => {
    const userId = req.body.user;
    if(!userId){
        return res.status(400).json({msg:"User not authenticated"})
    }
    const user = await User.findById(userId).select("-password");

    if(!user) {
        return res.status(404).json({msg: "User does not exist"});
    }

    return res.status(200).json(user);
}

export {
    registerUser,
    loginUser, getUser,
};   getUser