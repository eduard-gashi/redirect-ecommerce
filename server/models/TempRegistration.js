import mongoose from 'mongoose';

const tempRegistrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  registrationToken: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 3600,
  },
});

const TempRegistration = mongoose.model('TempRegistration', tempRegistrationSchema);
export default TempRegistration;