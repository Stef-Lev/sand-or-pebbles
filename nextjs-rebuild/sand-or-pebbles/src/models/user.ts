import { Schema, model, models } from "mongoose";
import { IUser, IUserModel } from "@/types/schemas";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
  fullname: String,
  avatar: Number,
  username: { type: String, required: true },
  password: { type: String, required: true },
  passwordCheck: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match.",
    },
  },
  records: [
    {
      title: String,
      url: String,
      username: String,
      password: String,
      logo: String,
      iv: String,
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordCheck = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changePassword = async function (oldPassword, newPassword) {
  const isCorrectPassword = await this.correctPassword(
    oldPassword,
    this.password
  );
  if (!isCorrectPassword) {
    throw new Error("Incorrect old password");
  }

  // Hash the new password and update the user document
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  this.password = hashedPassword;
  await this.save();
};

const User = models.User || model<IUser, IUserModel>("User", UserSchema);

export default User;
