import mongoose from 'mongoose';

const tempRegistrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  registrationToken: {
    type: String,
    required: true,
  },
  // Der Index sorgt dafür, dass die Daten nach 1 Stunde gelöscht werden
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 3600 // Dokument wird nach 3600 Sekunden (1 Stunde) gelöscht
  },
});

const TempRegistration = mongoose.model('TempRegistration', tempRegistrationSchema);
export default TempRegistration;