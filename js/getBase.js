let param={};

function getConferenceName(id){
    let buttonID= id;
    let ConferenceName;
    let ConferenceID;

    switch(buttonID){

        case "darWin-0100-Rc":
            ConferenceName = "Darwin 2021 RC - STEMi Makers Africa";
            ConferenceID ="appV8InzyT6tEQHtP";
           break;

        //add cases when bases are ready

            //defaults to null
        default:
            ConferenceName= null;
            ConferenceID= null;
    }

    param={
        baseID: ConferenceID,
        baseName: ConferenceName,
    };
  
    //set storage
    sessionStorage.setItem("ConferenceID", param.baseID);
    sessionStorage.setItem("ConferenceName", param.baseName);

    if (param.baseName === null) {
        //if btn for a rc is clicked that doesn't have a base
        window.location.reload();
    }
    else{
        //redirect to rc page
        window.location.replace("http://127.0.0.1:5500/darwin.html");
    }

}
