import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
