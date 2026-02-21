const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);


//this is the same as i have done it in the controller where i hash the password direcly because i dont understand hashing it here
// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return

//   try {
//     const salt = await bcryptjs.genSalt(10)
//     this.password = await bcryptjs.hash(this.password, salt)
//   }
//   catch (err) {
//     throw err
//   }
// })

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcryptjs.compare(candidatePassword, this.password)
// }

module.exports = mongoose.model("User", userSchema);
