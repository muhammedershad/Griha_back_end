import mongoose, { Document, Schema } from "mongoose";

interface IConversation extends Document {
    members: string[];
}

const ConversationSchema: Schema<IConversation> = new Schema(
    {
        members: [{ type: String, ref: "Users" }],
    },

    { timestamps: true }
);

export default mongoose.model<IConversation>(
    "Conversation",
    ConversationSchema
);
