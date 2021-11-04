let param={};
// import './fetchData';

console.log("Checking")
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

  alert(param.baseName);

    if (param.baseName === null) {
        window.location.replace("https://thedarwin.in/");
    }
    else{
        //redirect to rc.html page
        window.location.replace("http://127.0.0.1:5500/rc.html");

    }

   
}
