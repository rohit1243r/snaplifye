import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    business: {
      type: String,
      required: true,
      trim: true,
    },

    websiteType: {
      type: String,
      default: "",
    },

    budget: {
      type: String,
      default: "",
    },

    details: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Completed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;