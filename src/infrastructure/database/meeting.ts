import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IMeeting extends Document {
  _id: ObjectId;
  time: Date;
  employee: ObjectId;
  user: ObjectId | null;
  status: String;
  department: String;
}

const MeetingSchema: Schema = new Schema({
  time: { type: Date, required: true },
  employee: { type: Schema.Types.ObjectId, required: true, ref: 'Employees' },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  status: { type: String, required: true, default: 'active', enum: [ 'active' ] },
  department: { type: String, required: true },
});

const Meeting = mongoose.model<IMeeting>('Meeting', MeetingSchema);

export default Meeting;

