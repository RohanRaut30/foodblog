const mongoose = require("mongoose");

mongoose.connect("mongodb://foodblogapp-server:RCt1m9eWvBh6fJnEwUgxxqiH3LQsKzlndKEYzu4Bh2P4w8GCxLWsvZllBvFuDNqZb3DSofK4dgoFACDbHTGrRA==@foodblogapp-server.mongo.cosmos.azure.com:10255/foodblogapp-database?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@foodblogapp-server@",{
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(()=>{
    console.log('Connection Successful!!');
}).catch((e)=> {
    console.log(e+' no connection');
})

