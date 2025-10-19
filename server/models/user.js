import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Mongoose "pre-save hook". Runs before a user document is saved. Ensures that if the password is new or modified, it gets hashed.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Vergleiche eingegebenes Passwort mit gespeichertem Hash.");
  console.log("Eingegebenes Klartext-Passwort:", enteredPassword); // Das, was der Nutzer eingibt
  console.log("Gespeicherter Hash:", this.password); // Das, was aus der DB kommt (sollte mit $2b beginnen)

  // bcrypt.compare führt den Vergleich sicher durch
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log("Vergleichsergebnis:", isMatch);
  
  return isMatch;
};
export default mongoose.model("User", userSchema);