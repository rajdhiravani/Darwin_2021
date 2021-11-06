let param={};

function getConferenceName(id){
    let buttonID= id;
    let ConferenceName;
    let ConferenceID;

    switch(buttonID){

        case "darWin-0100-Rc":
            ConferenceName= "Darwin 2021 RC - STEMi Makers Africa";
            ConferenceID ="appV8InzyT6tEQHtP";
           break;

        case "darWin-0101-Rc":
            ConferenceName= "Darwin 2021 RC - BioLilo Lab";
            ConferenceID= "appozVt5YZeQiPMxm";
            break;

        case "darWin-0102-Rc":
            ConferenceName = "Darwin 2021 RC - Cygnu Science";
            ConferenceID = "appCJhPihteDq11yD";
            break;

        case "darWin-0103-Rc":
            ConferenceName = "Darwin 2021 RC - Wizkit";
            ConferenceID = "appUVoha73eRhs22b";
            break;

        case "darWin-0104-Rc":
            ConferenceName ="Darwin 2021 RC - Genia Lab";
            ConferenceID ="appHYlPz2pbMqB4bw";
            break;

        case "darWin-0105-Rc":
            ConferenceName = "Darwin 2021 RC - Biografos Colectivo de Ilustracion (BGCI)";
            ConferenceID ="appmyw0MA9QApWAfF";
            break;

        case "darWin-0106-Rc":
            ConferenceName ="";
            ConferenceID ="";
            break;

        case "darWin-0107-Rc":
            ConferenceName ="Darwin 2021 RC - Coevolution Research Assembly";
            ConferenceID="appm1JXmPPHLXbfRu";
            break;

        case "darWin-0108-Rc":
            ConferenceName = "Darwin 2021 RC - Independencia Lab";
            ConferenceID = "app7cRvuzBYvgR7Wv";
            break;

        case "darWin-0109-Rc":
            ConferenceName = "Darwin 2021 RC - Nextia Lab";
            ConferenceID= "appTMqSkovNU87esi";
            break;

        case "darWin-0110-Rc":
            ConferenceName = "Darwin 2021 RC - Udruga Studenata Biotechnologije Sveucilista u Rejeci (USBRi)";
            ConferenceID = "app5PGJKqdlpAU72p";
            break;

        case "darWin-0111-Rc":
            ConferenceID = "apphCyYa72ztlQ82s";
            ConferenceName = "Darwin 2021 RC - Light Microscopy Australia";
            break;

        case "darWin-0112-Rc":
            ConferenceID = "app0G6lINT57ZkrMC";
            ConferenceName = "Darwin 2021 RC - LABVA";
            break;

        case "darWin-0113-Rc":
            ConferenceID = "appBKz3IBZwayBwbE";
            ConferenceName = "Darwin 2021 RC - Playo";
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
  
    //set storage
    sessionStorage.setItem("ConferenceID", param.baseID);
    sessionStorage.setItem("ConferenceName", param.baseName);

    if (param.baseName === null) {
        //if btn for a rc is clicked that doesn't have a base
        window.open("https://thedarwin.in/")
     
    }
    else{
        // //redirect to rc page
        window.open("http://127.0.0.1:5500/darwin.html")
    }

}
