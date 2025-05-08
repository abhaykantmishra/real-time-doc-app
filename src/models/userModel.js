import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  provider: {
    type: String,
    default: 'local', // credential,google, github, etc.
  },
  verified: {
    type: Boolean,
    default: false,
  },
  // All owned documents
  allDocuments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    }
  ],
  // All documents that are starred
  starredDocuments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    }
  ],
  // All documents that are shared to the user
  sharedDocuments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// const User = mongoose.model('User', userSchema);
// export const User = models.User || model("User", userSchema);
export default mongoose.models.User || mongoose.model("User", userSchema);

