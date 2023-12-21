import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IAdmin extends Document {
  _id: ObjectId;
  Username: String;
  Password: String;
}

const AdminSchema: Schema = new Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

const AdminModel = mongoose.model<IAdmin>('Admin', AdminSchema);

export default AdminModel;

