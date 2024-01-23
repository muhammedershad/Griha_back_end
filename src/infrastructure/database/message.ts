import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  conversationId: string;
  sender: string;
  text: string;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
