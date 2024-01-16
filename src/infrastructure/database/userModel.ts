import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers extends Document {
  _id: ObjectId;
  FirstName: string;
  LastName: string;
  Username: string;
  Password: string;
  Phone: number;
  Email: string;
  image: string | null;
  Client: boolean;
  IsBlocked: boolean;
  CreatedAt: Date;
}

const UsersSchema: Schema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Phone: { type: Number, required: true },
  Email: { type: String, required: true, unique: true },
  image: { type: String },
  Client: { type: Boolean, required: true, default: false },
  IsBlocked: { type: Boolean, required: true, default: false },
  CreatedAt: {type: Date, default: new Date()}
});

const UserModel = mongoose.model<IUsers>('Users', UsersSchema);

export default UserModel;