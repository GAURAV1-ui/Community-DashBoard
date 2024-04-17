import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../models/user.model";
import { Request, Response,NextFunction } from "express";



export const verifyToken = async(req: Request,res: Response,next: NextFunction) => {
    try {
        let token: string | null = null;
        token =  req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if(!token) {
            return res.status(401).json({msg: "Unauthorized request"});
        }

        const secretKey = process.env.SECRET_KEY || "";

        const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

        const user = await User.findById(decodedToken.userId).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        req.body.user = user || null;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}