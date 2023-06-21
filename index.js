const app = require('./app');

const dotenv = require('dotenv');

const connectDatabase = require('./config/database');

//Handling Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught Exception');
    process.exit(1);
});

//config
dotenv.config({path:'config/config.env'});

//conecting to Database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unhandeled Promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to unhandeled Promise Rejection');
    server.close(() => {
        process.exit(1);
    })
})