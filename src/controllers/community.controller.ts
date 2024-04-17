import { Request, Response } from "express"
import {Community} from "../models/community.model";

const createCommunity = async(req:Request,res: Response) => {
    const {name} = req.body;

    if(!name) {
        return res.status(400).json({msg: "Name not specified"});
    }

    const user = req.body.user;

    if(!user) {
        return res.status(400).json({msg: "Not Authorised"});
    }

    const communityUser = await new Community({
        name,
        slug: name,
        owner: user._id,
    })
    
    await communityUser.save();

    return res.status(201).json({
        status : true,
        content :{
                data: communityUser,
            }
        });
}

const getCommunityUser = async(req:Request, res: Response) => {
    const user = req.body.user;
    if(!user) {
        return res.status(404).json({msg: "User NOT Authenticated"});
    }

    const total:number = await Community.find().countDocuments() || 0;
    const page =1;
    const pages = Math.ceil(total/10);
    
    
    const rolesWithOwnerDetails = await Community.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails"
            }
        },  {
            $project: {
                _id: 1,
                name: 1,
                slug: 1,
                owner: {
                    $cond: {
                        if: { $isArray: "$ownerDetails" },
                        then: {
                            $arrayElemAt: [
                                {
                                    $map: {
                                        input: "$ownerDetails",
                                        as: "ownerDetail",
                                        in: {
                                            id: "$$ownerDetail._id",
                                            name: "$$ownerDetail.name"
                                        }
                                    }
                                },
                                0
                            ]
                        },
                        else: null
                    }
                },
                created_at: 1,
                updated_at: 1
            }
        }
    ]);

    res.status(200).json({
        status: true,
        content: {
            meta: {
                page:page,
                pages:pages,
                total: total
            },
            data: rolesWithOwnerDetails
        }
    });

}

export {
    createCommunity,
    getCommunityUser
}