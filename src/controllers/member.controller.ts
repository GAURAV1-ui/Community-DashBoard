import { Request, Response } from "express";
import {Community} from "../models/community.model";
import {Role} from "../models/role.model";
import { IMember, Member } from "../models/member.model";

const createMember = async (req: Request, res: Response) => {

    console.log(req.body.user)
    const { community, user, role } = req.body;

    console.log(user, community, role)

    try {
        if (!user || !community || !role) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const userRole = await Role.findById(role);
        if (!userRole) {
            return res.status(400).json({ msg: "User role not found" });
        }

        if (userRole.name !== "Community Admin") {
            return res.status(403).json({ msg: "Only Community Admin can add members" });
        }

        const newMember = new Member({
            community,
            user,
            role,
        });

        const createdMember = await newMember.save();

        return res.status(201).json({
            status: true,
            content: {
                data: createdMember
            }
        });
    } catch (error) {
        return res.status(500).json({ msg: "Server Error" });
    }
}

const removeMember = async(req:Request, res: Response) => {
    const memberId = req.params.memberId;


    if(!memberId) {
        res.status(400).json({msg: "Invalid id"});
    }

    const member = await Member.findById(memberId);

    if(!member) {
        res.status(400).json({msg: "User role not defined"});
    }

    const userRole = await Role.findById(member?.role);

    if (!userRole || (userRole.name !== "Community Admin" && userRole.name !== "Community Moderator")) {
        return res.status(403).json({ msg: "NOT_ALLOWED_ACCESS" });
    }


    const updatedMember = await Member.findOneAndUpdate(
        { _id: memberId},
        { $pull:{ member: memberId } } ,
        { new: true } 
    );

    if (!updatedMember) {
        return res.status(404).json({ msg: "Community not found" });
    }

    return res.status(200).json({ msg: "Member removed successfully", updatedMember });

}

export {
    createMember,
    removeMember
}
