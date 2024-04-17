import mongoose, { Document, Schema } from 'mongoose';
import { Snowflake } from "@theinternetfolks/snowflake";

export interface IRole extends Document {
  _id: string;
  name: string;
}

const timestamp = new Date();

const roleSchema: Schema = new Schema<IRole>({
  _id: {
    type: String,
    required: true,
    default: Snowflake.generate({timestamp, shard_id: 12444}),
  },
  name: {
    type: String,
    required: true,
  }
},
{
    _id: false,
    timestamps:true,

}
);


export const Role = mongoose.model<IRole>('Role', roleSchema);

