import mongoose, { Document, Schema } from 'mongoose';


interface Community extends Document {
  _id: string;
  name: string;
  slug: string;
  owner: string;
}

const communitySchema: Schema = new Schema<Community>({
    _id:{
        type: String,
        required: true,
        unique: true,
    },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.String,
    ref: 'User',
    required: true
  },

},
{
    _id:false,
    timestamps:true,
});

const Community = mongoose.model<Community>('Cummunity', communitySchema);

export default Community;
