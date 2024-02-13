const mongoose = require("mongoose");

mongoose.connect("mongodb://rrfoodblogapp0-server:Y8c5uEEBznGAfww3rEYNeLqppz9g2H3UpUFBWxazOLIjSmPCIPx5cRheuQnh8rgw1dy6i5d169D9ACDbOyoJzg==@rrfoodblogapp0-server.mongo.cosmos.azure.com:10255/rrfoodblogapp0-database?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@rrfoodblogapp0-server@",{
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(()=>{
    console.log('Connection Successful!!');
}).catch((e)=> {
    console.log(e+' no connection');
})

 