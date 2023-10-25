
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/LoginSignup", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  tokens:[{
    token:{
      type:String,
      required:true,
    }
  }]
});

// Define the generateAuthToken method within the schema
LoginSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})

    // save to database
    await this.save();
    return token; // Return the generated token
  } catch (err) {
    console.log("Error generating token:", err);
    throw err;
  }
}

const collection = mongoose.model("collection1", LoginSchema);

module.exports = collection;
