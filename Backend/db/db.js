const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://darshan:darshan@cluster0.2oldjcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// darshmongo
const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;