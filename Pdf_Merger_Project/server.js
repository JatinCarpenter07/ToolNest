const express = require('express');
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const {getPdfPageCount} =require('./countNoPages');
const app = express();
const upload = multer({ dest: "uploads" })
const { funcMerger } = require("./mergeSeparate");
const port = 5600;


app.use(express.static(path.join(__dirname, "public")));

const validityOfPdfs=async(filesData,bodyData)=>{
    let totalFiles=filesData.length;
    for(let i=0;i<totalFiles;i++){
        const str=`pdf${i}`;
        if(bodyData[str]=="page"){
            let pdfPages= await (getPdfPageCount(filesData[i].path));
            const str1=bodyData[`page${i}`];
            const numArray = str1.split(",").map(num => parseInt(num, 10));
            for (const ele of numArray) {
                if(ele<=0 ||ele>pdfPages){
                    return {
                        valid:"NO",
                        fileName:`${filesData[i].originalname}`
                    }
                }  
            }
        }
        else if(bodyData[str]=="range"){
            let pdfPages= await (getPdfPageCount(filesData[i].path));
            const str1=bodyData[`range${i}`];
            const numArray = str1.split("-").map(num => parseInt(num, 10));
            for (const ele of numArray) {
                if(ele<=0 ||ele>pdfPages){
                    return {
                        valid:"NO",
                        fileName:`${filesData[i].originalname}`
                    }
                }  
            }
        }
    }
    return {
        valid:"YES",
        fileName:"No need",
    }
}


app.get("/", (req, res) => {
    console.log("Getting the request from the '/'");
    res.sendFile(path.join(__dirname, "/templates/index.html"))
    console.log("Provide the Index.html file...");
})

app.post("/merger", upload.array("pdfs"), async (req, res) => {
    console.log("Files Uploaded...");
    console.log("Going to check the Validity of Page No...");
    const check=await validityOfPdfs(req.files,req.body);
    if(check.valid=="NO"){
        console.log("Invalid Page No. Found...")
        res.send(`<h1 style="text-align: center; 
            margin-top: 50vh; transform: translateY(-50%);">
            Invalid Page No./Range!! <br>File : ${check.fileName}.</h1>`);
        console.log("Respond with the Error of Page No...")
        return;
    }
    console.log("All Page No. are Valid...");
    console.log("Initiating Merging...");
    let d=await funcMerger(req.files,req.body);
    console.log("Merging Done...");
    res.sendFile(path.join(__dirname, `/public/pdfs/${d}.pdf`))
    console.log("File Sent to Client...");
})

app.post("/cleanup", (req, res) => {
    const pdfDir = path.join(__dirname, "public", "pdfs");

    fs.readdir(pdfDir, (err, files) => {
        files.forEach(file => {
            const filePath = path.join(pdfDir, file);
            fs.unlink(filePath, err => {
                if (err) console.error("Error deleting file:", err);
            });
        });
    });
    
    const uploadDir = path.join(__dirname, "uploads");
    
    fs.readdir(uploadDir, (err, files) => {
        files.forEach(file => {
            const filePath = path.join(uploadDir, file);
            fs.unlink(filePath, err => {
                if (err) console.error("Error deleting file:", err);
            });
        });
        console.log("Old Data Cleaned...");
    });
});



app.listen(port, "0.0.0.0", () => {
    console.log(`Server listing the requests from http://localhost:${port}...`);
})