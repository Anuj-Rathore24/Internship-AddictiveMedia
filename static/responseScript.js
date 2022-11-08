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

        var viewButton=document.createElement("button");
        viewButton.innerHTML="View Resume";
        viewButton.id=list[i].FileName;
        viewButton.onclick=(e)=>viewFunction(e.target.id);
        subContainer.append(viewButton);
        
        var downloadButton=document.createElement("button");
        downloadButton.innerHTML="Download Resume";
        downloadButton.id=list[i].FileName;
        downloadButton.onclick=(e)=>downloadFunction(e.target.id);
        subContainer.append(downloadButton);

        container.append(subContainer);
    }
}


async function viewFunction(FileName){
    const url="/document/view"
    await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({file:FileName}),
    });
}
async function downloadFunction(FileName){
    const url="/document/download"
    await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({file:FileName}),
      });
}