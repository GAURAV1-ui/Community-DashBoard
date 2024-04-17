import mongoose, { Document, Schema } from 'mongoose';

interface Member extends Document {
  _id: string;
  community: string;
  user: string;
  role: string;
}

const memberSchema = new Schema<Member>({
    
    _id: {
        type:String,
        required: true,
        unique: true
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
const Member = mongoose.model<Member>('Member', memberSchema);

export default Member;
