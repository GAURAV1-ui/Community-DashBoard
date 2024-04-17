import { Request,Response } from "express";
import {Role, IRole} from "../models/role.model";

const createUserRole = async(req:Request, res:Response) => {
    try {
        const {name} = req.body;
    
        if(!name){
            return res.status(400).json({msg: "User role does not exist"});
        }
    
        const createdUserRole :IRole = new Role({
                name:name,
            }
        )
        const savedUserRole = await createdUserRole.save();
    
            if (!savedUserRole) {
                return res.status(404).json({ msg: "User role not created" });
            }
    
            res.status(200).json(savedUserRole);
    
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: "Invalid response"})
    }
} 

const getUserRole = async(req: Request, res: Response) => {

    const page = parseInt(req.query.page as string) || 1;

    const total:number = await Role.find().countDocuments() || 0;

    const pages:number = Math.ceil(total/10);

    const  totalRole = await Role.find().skip((page-1)*10).limit(10);

    if(!totalRole) {
        return res.json({msg : "No role has been assgined"});
    }

    return res.status(200).json({
        status: true,
        content : {
            data : totalRole,
        },
        meta: {
            page:page,
            pages:pages,
            total: total
        }
    })
}

export {
    createUserRole,
    getUserRole,
}