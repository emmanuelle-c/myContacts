import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true,  },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });


const Contact = mongoose.model("Contact", contactSchema)

export default Contact;