import mongoose from "mongoose";

const Schema = mongoose.Schema

export const BlogSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true},
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    body: { type: String, required: true },
    img: { type: String, required: true },
},
    { timestamps: true, toJSON: { virtuals: true } }
);

BlogSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: "Account",
    justOne: true
})