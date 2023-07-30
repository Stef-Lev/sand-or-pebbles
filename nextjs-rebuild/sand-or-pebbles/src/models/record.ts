import { Schema, model, models } from "mongoose";
import { IRecord } from "@/types/schemas";

const RecordSchema = new Schema<IRecord>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },

  iv: {
    type: String,
    required: true,
  },
});

const Record = models.Record || model("Record", RecordSchema);

export default Record;
