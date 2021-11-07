var param={};
var UrlName="";

//get current url
let currentURL = window.location.href;

if(currentURL)
    var paramString = currentURL.split('?')[1];
    var queryString = new URLSearchParams(paramString);

   for (let pair of queryString.entries()) {
      //hyphenated name in url
       urlName = pair[0];
    }
//    alert(urlName);
//    console.log(urlName);

//to concatenate hyphened words
   var stringName = urlName;
   stringName = stringName.split('-').map(function (s, i) {
        return i && s.length ? s[0].toUpperCase() + s.substring(1) : s;
    }).join('');

//    alert(stringName);
//    console.log(stringName);



if (stringName !=null){
    let confName = stringName;
    getConferenceName(confName);
}


function getConferenceName(id){
    let buttonID= id;
    let ConferenceName;
    let ConferenceID;

    switch(buttonID){

        case "StemiMakersAfrica":
            ConferenceName = "Darwin 2021 RC - STEMi Makers Africa";
            ConferenceID = "appV8InzyT6tEQHtP";
            break;

        case "darWin0100Rc":
            ConferenceName= "Darwin 2021 RC - STEMi Makers Africa";
            ConferenceID ="appV8InzyT6tEQHtP";
           break;

        case "darWin0101Rc":
            ConferenceName= "Darwin 2021 RC - BioLilo Lab";
            ConferenceID = "appozVt5YZeQiPMxm";
            break;

        case "darWin0102Rc":
            ConferenceName = "Darwin 2021 RC - Cygnu Science";
            ConferenceID = "appCJhPihteDq11yD";
            break;

        case "darWin0103Rc":
            ConferenceName = "Darwin 2021 RC - Wizkit";
            ConferenceID = "appUVoha73eRhs22b";
            break;

        case "darWin0104Rc":
            ConferenceName ="Darwin 2021 RC - Genia Lab";
            ConferenceID ="appHYlPz2pbMqB4bw";
            break;

        case "darWin0105Rc":
            ConferenceName = "Darwin 2021 RC - Biografos Colectivo de Ilustracion (BGCI)";
            ConferenceID ="appmyw0MA9QApWAfF";
            break;

        case "darWin0106Rc":
            ConferenceName ="Darwin 2021 RC - Socieda de Ingenieria Biologica - UTEC";
            ConferenceID ="appUwZJpfkSrdno6a";
            break;

        case "darWin0107Rc":
            ConferenceName ="Darwin 2021 RC - Coevolution Research Assembly";
            ConferenceID="appm1JXmPPHLXbfRu";
            break;

        case "darWin0108Rc":
            ConferenceName = "Darwin 2021 RC - Independencia Lab";
            ConferenceID = "app7cRvuzBYvgR7Wv";
            break;

        case "darWin0109Rc":
            ConferenceName = "Darwin 2021 RC - Nextia Lab";
            ConferenceID= "appTMqSkovNU87esi";
            break;

        case "darWin0110Rc":
            ConferenceName = "Darwin 2021 RC - Udruga Studenata Biotechnologije Sveucilista u Rejeci (USBRi)";
            ConferenceID = "app5PGJKqdlpAU72p";
            break;

        case "darWin0111Rc":
            ConferenceID = "apphCyYa72ztlQ82s";
            ConferenceName = "Darwin 2021 RC - Light Microscopy Australia";
            break;

        case "darWin0112Rc":
            ConferenceID = "app0G6lINT57ZkrMC";
            ConferenceName = "Darwin 2021 RC - LABVA";
            break;

        case "darWin0113Rc":
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
        // window.open("https://thedarwin.in/")
     
    }
    else{
        // //redirect to rc page
        window.open("/darwin.html")
    }

}
