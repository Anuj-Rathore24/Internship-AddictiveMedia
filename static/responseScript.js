//Api to get all the Responses from backend
async function getRespones(e) {
  e.preventDefault();
  const url = "/getResponsesData";
  const data = {
    sName: e.target.Name.checked,
  };

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resultSet = response.json(); // parses JSON response into native JavaScript objects
  resultSet.then((r) => {
    createTemplate(r);
    console.log(r);
  });
}


//For Creating widgets
function createTemplate(list){

    //empty container before adding widgets
    var container=document.getElementById("listContainer");
    container.innerHTML="";
    
    //For iterating over all the records from database
    for(var i=0;i<list.length;i++){
        var subContainer=document.createElement("div");
        subContainer.className="SubContainer";

        //Name Para
        var namePara=document.createElement("p");
        namePara.innerHTML=list[i].userName;
        subContainer.append(namePara);
        
        //Date Para
        var datePara=document.createElement("p");
        datePara.innerHTML=list[i].Date;
        subContainer.append(datePara);
        
        //country Para
        var countryPara=document.createElement("p");
        countryPara.innerHTML=list[i].country;
        subContainer.append(countryPara);
        
        //First Form for viewing PDFs
        var form1=document.createElement("form")
        form1.action="/document/view";
        form1.method="post";
        var viewButton=document.createElement("input");
        viewButton.value="View Resume";
        viewButton.type="submit";
        viewButton.onclick=(e)=>{
            document.cookie=`FileName=${e.target.id}`;
        }
        viewButton.id=list[i].FileName;
        form1.append(viewButton);
        subContainer.append(form1);
        
        //second Form for Downloading PDFs
        var form2=document.createElement("form")
        form2.action="/document/download";
        form2.method="post";
        var downloadButton=document.createElement("input");
        downloadButton.type="submit";
        downloadButton.value="Download Resume";
        downloadButton.onclick=(e)=>{
            document.cookie=`FileName=${e.target.id}`;
        }
        downloadButton.id=list[i].FileName;
        form2.append(downloadButton);
        subContainer.append(form2);
        

        //Button for deleting a Record!
        var deleteButton=document.createElement("button");
        deleteButton.id=list[i].FileName;
        deleteButton.innerHTML="Delete Record";
        deleteButton.onclick=(e)=>{
            document.cookie=`FileName=${e.target.id}`;
            const url="/deleteRecords";
            fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }
        subContainer.append(deleteButton);

        container.append(subContainer);
    }

    if(list.length==0){
        var subContainer=document.createElement("div");
        subContainer.className="SubContainer";

        subContainer.innerHTML="<h3>No Entries!</h3>"
        container.append(subContainer);
    }
}


