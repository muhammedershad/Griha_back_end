import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers extends Document {
  _id: ObjectId;
  FirstName: String;
  LastName: String;
  Username: String;
  Password: String;
  PhoneNumber: Number;
  Email: String;
  Image: String | null;
  Client: Boolean;
  IdBlocked: Boolean;
}

const UsersSchema: Schema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  PhoneNumber: { type: Number, required: true },
  Email: { type: String, required: true, unique: true },
  Image: { type: String },
  Client: { type: Boolean, required: true },
  IsBlocked: { type: Boolean, required: true },
});

const UserModel = mongoose.model<IUsers>('Users', UsersSchema);

export default UserModel;