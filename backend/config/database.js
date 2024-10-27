// const mongoose = require("mongoose");

// const connectDatabase = () => {
//     mongoose.connect(process.env.DB_LOCAL_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology:true
//   }).then((con) => {
//     console.log(`MongoDB connect to host:  ${con.connection.host}`);
//   }).catch((err) => {
//       console.log(err)
//   })
// };

// module.exports = connectDatabase;

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI).then((con) => {
    console.log("MongoDB connected to host: " + con.connection.host);
  })
};

module.exports = connectDatabase;