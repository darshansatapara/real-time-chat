const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sataparad1:darshmongo%40286@clustercommunity.xmtg3xd.mongodb.net/"

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