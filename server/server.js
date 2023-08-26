import express, { urlencoded }  from "express";
import cors from 'cors'
import morgan from "morgan";
import dbConnection from "./database/dbConnection.js";
import route from "./router/route.js";

const app = express();

// middleWares 
app.use(express.json());
app.use( express.urlencoded({extended : true}));
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by') // secure your web from hackers 

// port variable
const port = 8080;

// hhttp request
app.use("/" , route )


// start server before connecetion to the database 
dbConnection()

app.listen(port , ()=> {
    console.log('server is started');
})