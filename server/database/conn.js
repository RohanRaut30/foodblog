const mongoose = require("mongoose");

mongoose.connect("mongodb://foodblogsite0-server:15oe1h9rq2FB1D9gVdxfpXyx2jXt5Z04A36ewfSxav3Wm9sDpcxsqkDNT2IebNx7rq5jH7nxtz7iACDb77sKkQ==@foodblogsite0-server.mongo.cosmos.azure.com:10255/foodblogsite0-database?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@foodblogsite0-server@",{
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(()=>{
    console.log('Connection Successful!!');
}).catch((e)=> {
    console.log(e+' no connection');
})

 