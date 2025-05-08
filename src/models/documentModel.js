import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "Untitled Document",
    required: true,
  },
  content: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic:{
    type: Boolean,
    default: false,
  },
  sharedWith:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  sharedWithPermissions: {
    type: String,
    default: "read", // read, write
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

documentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Document || mongoose.model("Document", documentSchema);


