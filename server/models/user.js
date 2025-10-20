import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
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
  this.password = this.password.trim();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Vergleiche eingegebenes Passwort mit gespeichertem Hash.");
  const trimmedEnteredPassword = enteredPassword.trim();
  const isMatch = await bcrypt.compare(trimmedEnteredPassword, this.password);
  console.log("Vergleichsergebnis:", isMatch);
  return isMatch;
};
export default mongoose.model("User", userSchema);