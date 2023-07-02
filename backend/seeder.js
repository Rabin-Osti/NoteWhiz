import sampleData from "./seeder/sampleData.js";
import { connect } from "./utils/connect.js";
import dotenv from "dotenv";
import Note from "./models/noteModel.js";
dotenv.config();

const importData = async () => {
  try {
    connect();
    await Note.deleteMany();
    console.log("all note deleted");
    await Note.insertMany(sampleData);
    console.log("Note imported!");
    process.exit();
  } catch (error) {
    console.log("Error while adding/inserting data. Error = ", error);
    process.exit(1);
  }
};
importData();
