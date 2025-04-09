const express = require('express');
const multer = require("multer");
const path=require('path');
const connectTheDB=require('./connections');
const cookieParser=require('cookie-parser');
const { logTheRequest, invalidRequest ,checkForAuthentication,restrictToRoles}=require('./middlewares/index');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
const app = express();


//requiring router
// const fileRouter=require('./routes/file');
const fileRouter=require('./routes/file');
const homeRouter=require('./routes/home');
const userRouter=require('./routes/user');

//middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(logTheRequest);
app.set("view engine","ejs"); //set the templating engine to "ejs"
app.set("views",path.join(__dirname,"/views"));  //all the ejs file will be find in the "views" folder 
app.use(checkForAuthentication);

//connections
connectTheDB("mongodb://127.0.0.1:27017/personalDriveDB");

//routes
app.use('/file',restrictToRoles(["NORMAL","ADMIN"]),upload.array("files"),fileRouter);
app.use('/user',userRouter);
app.use('/',homeRouter);

//middlewares
app.use(invalidRequest);

const PORT=5600;
app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});