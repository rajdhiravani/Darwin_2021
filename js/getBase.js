var param={};
let stringName = "";
let urlName = "";

//get current url
let currentURL = window.location.href;

regexp = /^[a-z0-9_\-]+$/i;
//seperate the part after ? in url
var paramString = currentURL.split('?')[1];
var queryString = new URLSearchParams(paramString);
for (let pair of queryString.entries()) {
    //hyphenated name in url
    urlName = pair[0];
}
getConferenceName(urlName);


function getFinalName(url){

    if (url) {
        //contains dash
        if (regexp.test(url)) {
            // to concatenate hyphened words
            stringName = url;
            stringName = stringName.split('-').map(function (s, i) {
                return i && s.length ? s[0].toUpperCase() + s.substring(1) : s;
            }).join('');

            let confName = stringName;
            return confName;

        }
        //no dash 
        else {
            stringName = url;
            let confName = stringName;
            return confName;
        }
    }

}


function getConferenceName(id){
    let buttonID = getFinalName(id);
    let ConferenceName;
    let ConferenceID;


    switch(buttonID){

        case "STEMiMakersAfrica":
            ConferenceName = "Darwin 2021 RC - STEMi Makers Africa";
            ConferenceID = "appV8InzyT6tEQHtP";
            break;

        case "BioLiloLab":
            ConferenceName= "Darwin 2021 RC - BioLilo Lab";
            ConferenceID = "appozVt5YZeQiPMxm";
            break;

        case "CygnuScience":
            ConferenceName = "Darwin 2021 RC - Cygnu Science";
            ConferenceID = "appCJhPihteDq11yD";
            break;

        case "Wizkit":
            ConferenceName = "Darwin 2021 RC - Wizkit";
            ConferenceID = "appUVoha73eRhs22b";
            break;

        case "GeniaLab":
            ConferenceName ="Darwin 2021 RC - Genia Lab";
            ConferenceID ="appHYlPz2pbMqB4bw";
            break;

        case "BGCI":
            ConferenceName = "Darwin 2021 RC - Biografos Colectivo de Ilustracion (BGCI)";
            ConferenceID ="appmyw0MA9QApWAfF";
            break;

        case "SBEUTEC":
            ConferenceName ="Darwin 2021 RC - Socieda de Ingenieria Biologica - UTEC";
            ConferenceID ="appUwZJpfkSrdno6a";
            break;

        case "CoevolutionResearch":
            ConferenceName ="Darwin 2021 RC - Coevolution Research Assembly";
            ConferenceID="appm1JXmPPHLXbfRu";
            break;
            
        case "IndependenciaBiolab":
            ConferenceName = "Darwin 2021 RC - Independencia Lab";
            ConferenceID = "app7cRvuzBYvgR7Wv";
            break;

        case "NextiaLab":
            ConferenceName = "Darwin 2021 RC - Nextia Lab";
            ConferenceID= "appTMqSkovNU87esi";
            break;

        case "USBRI":
            ConferenceName = "Darwin 2021 RC - Udruga Studenata Biotechnologije Sveucilista u Rejeci (USBRi)";
            ConferenceID = "app5PGJKqdlpAU72p";
            break;

        case "LightMicroscopyAustralia":
            ConferenceID = "apphCyYa72ztlQ82s";
            ConferenceName = "Darwin 2021 RC - Light Microscopy Australia";
            break;

        case "LABVA":
            ConferenceID = "app0G6lINT57ZkrMC";
            ConferenceName = "Darwin 2021 RC - LABVA";
            break;

        case "Playo":
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

     
    }
    else{
        // //redirect to rc page
        // window.open("/darwin.html")
        let newTab = window.open();

        newTab.location.href = "http://127.0.0.1:5500/darwin.html";
        // newTab.location.href = "https://thedarwin.in/darwin.html";
    }

}
