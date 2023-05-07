const mongoose =require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongo_url).then(() => {
    console.log('Connected to Database');
})
.catch((err)=>{
    console.log(`Could not connect to database ${err}` +err);
})