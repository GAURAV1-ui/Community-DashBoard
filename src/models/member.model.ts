import mongoose, { Document, Schema } from 'mongoose';
import { Snowflake } from "@theinternetfolks/snowflake";

export interface IMember extends Document {
  _id: string;
  community: string;
  user: string;
  role: string;
}

const timestamp = new Date();

const memberSchema = new Schema<IMember>({
    
    _id: {
        type:String,
        required: true,
        default: Snowflake.generate({timestamp, shard_id: 12454}),
    },
  community: {
    type: Schema.Types.String,
    ref: 'Community', 
    required: true
  },
  user: {
    type: Schema.Types.String,
    ref: 'User',
    required: true
  },
  role: {
    type: Schema.Types.String,
    ref: 'Role',
    required: true
  }
},
{
    _id:false,
    timestamps: true,
});
export const Member = mongoose.model<IMember>('Member', memberSchema);
