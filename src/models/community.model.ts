import mongoose, { Document, Schema } from 'mongoose';
import { Snowflake } from "@theinternetfolks/snowflake";

export interface ICommunity extends Document {
  _id: string;
  name: string;
  slug: string;
  owner: string;
}

const timestamp = new Date();

const communitySchema: Schema = new Schema<ICommunity>({
    _id:{
        type: String,
        default: Snowflake.generate({timestamp, shard_id: 12454}),
    },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  owner: {
    type: Schema.Types.String,
    ref: 'User',
  },

},
{
    _id:false,
    timestamps:true,
});

export const Community = mongoose.model<ICommunity>('Cummunity', communitySchema);

