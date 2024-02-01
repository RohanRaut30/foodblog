const mongoose = require("mongoose");

mongoose.connect("mongodb://foodblogsite-server:u72YWv2rT6Les8XEzUTnP2V9vjwcX6iHPedFDfTutsBjAtGQzlaQGbUv8aSsVOOde7lN5W7Cx3zNACDbkeO1bQ==@foodblogsite-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@foodblogsite-server@",{
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(()=>{
    console.log('Connection Successful!!');
}).catch((e)=> {
    console.log(e+' no connection');
})

