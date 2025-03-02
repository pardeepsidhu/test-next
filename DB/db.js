const { default: mongoose } = require("mongoose")

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.DATA_BASE);
    console.log("Database Connected Succefuly !");
  } catch (error) {
    console.log(error)
  }
}

export {connectDB}