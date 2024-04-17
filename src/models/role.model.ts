import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing the document in MongoDB
interface Role extends Document {
  id: string;
  name: string;
}

const roleSchema = new Schema<Role>({
  id: {
    type: String,
    required: true,
    unique: true ,
  },
  name: {
    type: String,
    required: true,
    unique: true, 
  }
},
{
    timestamps:true,
    _id: false,
}
);


const Role = mongoose.model<Role>('Role', roleSchema);

export default Role;
