const formGenerator=(inputFileEvent)=>{
    const inputEle=inputFileEvent.target;
    const divPdfList=document.getElementById("pdfsList");
    divPdfList.innerHTML="";

    const filesArray=Array.from(inputEle.files);
    filesArray.forEach((file,index)=>{
        divPdfList.innerHTML+=
            `<div>
                ${file.name}
                <select name="pdf${index}" onchange="createInput(event,${index})">
                    <option value="all">All</option>
                    <option value="page">Pages No.</option>
                    <option value="range">Range</option>
                </select>
            </div>`
    })
}

const createInput=(evnt,index)=>{
    let obj=document.getElementsByClassName(`otherSelect${index}`)
    Array.from(obj).forEach((ele)=>{
        ele.remove();
    });
    const select_ele=evnt.target;
    const select_div=select_ele.parentElement;
    if(select_ele.value=="page"){
        const inp=document.createElement("input");
        inp.setAttribute("type","text"); 
        inp.setAttribute("class",`otherSelect${index}`);
        inp.setAttribute("name",`page${index}`); 
        select_div.append(inp);
    }
    if(select_ele.value=="range"){
        const inp=document.createElement("input");
        inp.setAttribute("class",`otherSelect${index}`);
        inp.setAttribute("type","text"); 
        inp.setAttribute("name",`range${index}`);
        select_div.append(inp);
    }
}


const validate=(event)=>{
    const inputEle=document.getElementsByName("pdfs")[0];
    const errorMes=document.getElementById("errorMessage");
    if(inputEle.files.length<2){
        errorMes.innerHTML="Please select at least 2 PDF files.";
        event.preventDefault(); //to not submit the form 
        return false;
    }
    return true;
}

window.addEventListener("beforeunload", function () {
    fetch("/cleanup", { method: "POST" }); // Notify server to delete files
});