const PDFMerger = require('pdf-merger-js');
const path=require("path");

var merger = new PDFMerger();

const funcMerger=async (arrayFiles,objBody) => {
  for(let i=0;i<arrayFiles.length;i++){
    if(objBody[`pdf${i}`]=="all"){
      merger.add(arrayFiles[i].path);
    }
    else if(objBody[`pdf${i}`]=="page"){
      const pages=objBody[`page${i}`];
      if(pages.includes(",")){
        merger.add(arrayFiles[i].path,`${pages}`);
      }
      else{
        const arr=[];
        arr.push(parseInt(pages));
        merger.add(arrayFiles[i].path,arr);
      }
    }
    else if(objBody[`pdf${i}`]=="range"){
      const range=objBody[`range${i}`];
      merger.add(arrayFiles[i].path,range);
    }
  }
  let d=new Date().getTime();
  await merger.save(path.join(__dirname,"/public/pdfs",`${d}.pdf`));
  return d;
};

module.exports={funcMerger};