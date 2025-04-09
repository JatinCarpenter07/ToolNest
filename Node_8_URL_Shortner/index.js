const express=require('express');
const mongoose=require('mongoose');
const urlRouter=require('./routes/url');
const homeRouter=require('./routes/home');
const connectTheDB=require('./connections');
const { logTheRequest, invalidRequest }=require('./middlewares/index');
const app=express();
const port=5600;

//middlewares
app.use(express.json());
app.use(logTheRequest);

//connections
connectTheDB("mongodb://127.0.0.1:27017/urlShortnerDB")

//routes
app.use('/url',urlRouter);
app.use('/',homeRouter);

//middlewares
app.use(invalidRequest);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});