import mongoose, { Schema } from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// Generar código automático
deviceSchema.pre("validate", async function (next) {
  if (!this.isNew) return next();

  try {
    const last = await mongoose
      .model("Device")
      .findOne()
      .sort({ createdAt: -1 });

    const lastCode = last
      ? parseInt(last.code.replace("DEV", "")) 
      : 0;

    this.code = `DEV${String(lastCode + 1).padStart(3, "0")}`;
    next();
  } catch (err) {
    next(err);
  }
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
