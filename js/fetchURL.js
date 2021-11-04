let param={};
// import './fetchData';

console.log("Checking")
function getConferenceName(id){
    let buttonID= id;
    let ConferenceName;
    let ConferenceID;

    switch(buttonID){

        case "stemi":
            ConferenceName = "Darwin 2021 RC - STEMi Makers Africa";
            ConferenceID ="appV8InzyT6tEQHtP";
           break;
            //defaults to null
        default:
            ConferenceName= null;
            ConferenceID= null;

    }

    param={
        baseID: ConferenceID,
        baseName: ConferenceName,
    };
    alert(param.baseName);
}

var buttonClass = document.getElementsByClassName("RCBtn");

for (var i = 0; i < buttonClass.length; i++) {

    buttonClass[i].addEventListener('click', function() {

        console.log("this button onclick is working");
        // alert("this onclick is working");
        //set storage
        sessionStorage.setItem("ConferenceID", param.baseID);
        sessionStorage.setItem("ConferenceName", param.baseName);

        //redirect to rc.html page
        window.location.replace("http://127.0.0.1:5500/rc.html");
    }); 
}