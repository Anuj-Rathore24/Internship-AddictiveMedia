async function getRespones(e) {
  e.preventDefault();
  const url = "/getResponsesData";

  const data = {
    sname: e.target.Nsort.value,
    sdate: e.target.Dsort.value,
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

function createTemplate(list){
    var container=document.getElementById("listContainer");
    container.innerHTML="";
    for(var i=0;i<list.length;i++){
        var subContainer=document.createElement("div");
        subContainer.className="SubContainer";


        var namePara=document.createElement("p");
        namePara.innerHTML=list[i].userName;
        subContainer.append(namePara);
        
        var datePara=document.createElement("p");
        datePara.innerHTML=list[i].Date;
        subContainer.append(datePara);
        
        var countryPara=document.createElement("p");
        countryPara.innerHTML=list[i].country;
        subContainer.append(countryPara);

        var form1=document.createElement("form")
        form1.action="/document/view";
        form1.method="post";
        var viewButton=document.createElement("input");
        viewButton.innerHTML="View Resume";
        viewButton.type="submit";
        viewButton.onclick=(e)=>{
            document.cookie=`FileName=${e.target.id}`;
        }
        viewButton.id=list[i].FileName;
        form1.append(viewButton);
        subContainer.append(form1);
        
        var form2=document.createElement("form")
        form2.action="/document/download";
        form2.method="post";
        var downloadButton=document.createElement("input");
        downloadButton.type="submit";
        downloadButton.innerHTML="Download Resume";
        downloadButton.onclick=(e)=>{
            document.cookie=`FileName=${e.target.id}`;
        }
        downloadButton.id=list[i].FileName;
        form2.append(downloadButton);
        subContainer.append(form2);
        
        var deleteButton=document.createElement("button");
        deleteButton.innerHTML="Delete Record";
        subContainer.append(deleteButton);

        container.append(subContainer);
    }
}


