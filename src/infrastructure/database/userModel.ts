import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: number;
  email: string;
  image: string | null;
  client: boolean;
  isBlocked: boolean;
  createdAt: Date;
}

const UsersSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  client: { type: Boolean, required: true, default: false },
  isBlocked: { type: Boolean, required: true, default: false },
  createdAt: {type: Date, default: new Date()}
});

const UserModel = mongoose.model<IUsers>('Users', UsersSchema);

export default UserModel;