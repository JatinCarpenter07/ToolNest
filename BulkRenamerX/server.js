const path=require('path');
const fs=require('fs');


fs.readdir(path.join(__dirname),(error,data)=>{
    console.log(data);
    data.forEach((ele)=>{
        const old_word=fs.readFileSync(path.join(__dirname,"currentWord.text"));
        const new_word=fs.readFileSync(path.join(__dirname,"newWord.text"));
        if(ele.includes(old_word)){
            const oldPath=path.join(__dirname,ele);
            const newPath=oldPath.replaceAll(old_word,new_word);
            fs.rename(oldPath,newPath,()=>{
                console.log("Renaming done for the File :",ele);
            })
        }
    })
})