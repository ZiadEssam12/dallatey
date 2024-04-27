// mongoose db connection

import mongoose from "mongoose";

const connection = async () => {
  // console.log(process.env.DB_URL);
  await mongoose.connect(process.env.DB_URL).then(() => {
    console.log("MongoDB Connected");
  });
};

export default connection;
