//////////////////////////////////////////////////////TO FETCH AIRTABLE DATA OF EACH RC////////////////////////////////////////////////////////////////////////

let Airtable = require("airtable");
// const { base } = require("./airtable.browser");

////////////////////////////get URL param///////////////////////////
// currentURL = window.location.href;
// console.log(currentURL);

// function getQueryParam(name, url) {
//   var q = url.match(new RegExp('[?&]' + name + '=([^&#]*)'));
//   return q && q[1];
// }
// var urlName = getQueryParam('rc', currentURL);
//eg url: https://thedarwin.in/?rc=stemi
//output: conferenceName= stemi

// console.log(urlName);
// var conferenceName; //base name
// var conferenceID; //base id
//////////////convert RC name to Conference name (base name) and assign base id to each RC base///////////////

//put url param name as case
// switch (urlName) {
//   case "stemi":
//     conferenceName = "Darwin 2021 RC - STEMi Makers Africa";
//     conferenceID = "appV8InzyT6tEQHtP";
//     break;
    // keep adding here on addition of more bases
  // case "xyz":
  //   conferenceName= "xyz RC";
  //   conferenceID= "";



//   default:
//     // defaults to original Darwin base
//     conferenceName = "Darwin 2021"
//     conferenceID = "appRcXPwopPZ85HbJ";
// }

// Airtable credentials
const metaData = {
    baseID: "appV8InzyT6tEQHtP",
    baseName: "Darwin 2021 RC - STEMi Makers Africa",
    tablesCount: 3,
    tables: [
        "Conference overview",
        // "Speaker profiles",
        // "Workshop Details",
        // "Schedule",
        "Website Details",
        // "Pre-Event",
        "Collaborators",
        // "Testimonials",
        // "Schedule calendar",
        // "Publications",
        // "FAQs",
        // "Darwin 2019",
        // "Benefits",
        // "Highlights",
    ],
};

let conferenceOverview = [];
let speakerProfiles = [];
let preEvents = [];
let collaborators = [];
let testimonials = [];
let schedule = [];
let publications = [];
let faqs = [];
let darwin2019 = [];
let benefits = [];
let highlights = [];

const getAirtableData = async () => {
    updateConference();
    // updateSpeakers();
    updateWorkshops();
    // updateTestimonials();
    // updatePublications();
    updateCollaborators();
    // getHighlights();
    // updateFAQs();
    // updateBenefits();
};

const getRecords = async (tableName) => {
  let base = new Airtable({ apiKey: "key2otdbHDz4DE64m" }).base( "appV8InzyT6tEQHtP" );
    const fields = [];
    const records = await base(tableName)
        .select({
            filterByFormula: "( visible = TRUE() )",
        })
        .all();
    records.forEach(function (record) {
        fields.push(record.fields);
    });
    return fields;
};

const sortByOrder = (arr) => {
    const temp = arr.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
    });
    return temp;
};

const updateDetails = async () => {
  websiteDetails = await getRecords("Website Details");
  let template1 = "";
  let template2="";

  websiteDetails.forEach((conference, index=3) => {
    template1 += `
    <p><i class="fa fa-calendar"></i>websiteDetails[${index}].Information</p>
    `;
});
  document.querySelector("#conferenceDate").innerHTML =
    template1;



  websiteDetails.forEach((conference, index = 4) => {
    template2 += `
        <p><i class="fa fa-language"></i>websiteDetails[${index}]</p>
    `;
  });
  document.querySelector("#conferenceLanguage").innerHTML =
  template2;
  
};


const updateConference = async () => {
    conferenceOverview = await getRecords("Conference overview");
    conferenceOverview = sortByOrder(conferenceOverview);
    let template = "";
    let template2 = "";
    let template3= "";

    conferenceOverview.forEach((conference, index) => {
      if (conference.Type === "Talk")
        template += `
    <div class="blogCard">
      <div class="blogPic" style="background: url('${conference.Speakers[0].url}') center/cover" >
        <div class="blogPicTint"></div>
      </div>
      <div class="blogContent">
        <h3>${conference.Name}</h3>
        <button onclick="openModalWithMessage('${conference.Name}','${conference.Topic}', '${conference.Description}', '${conference.Name}')">Read More</button>
      </div>
    </div>
    `;
    });
    document.querySelector("#conferenceOverview > .blogsRow").innerHTML =
        template;

    // animateDynamicElements();
};

const updateSpeakers = async () => {
    speakerProfiles = await getRecords("Speaker profiles");
    speakerProfiles = sortByOrder(speakerProfiles);
    let template1 = "";
    let template2 = "";
    let template3 = "";
    let template4 = "";

    speakerProfiles.forEach((speaker, index) => {
        if (speaker.SessionType === "Talk")
            template1 += `
      <div class="speaker revealFromBottom" style="background: url('${speaker.ProfilePic ? speaker.ProfilePic[0].url : null
                }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription, speakerProfiles[${index}].Designation)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;
        else if (speaker.SessionType === "BioArt")
            template2 += `
      <div class="speaker revealFromBottom" style="background: url('${speaker.ProfilePic ? speaker.ProfilePic[0].url : null
                }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;
        else if (speaker.SessionType === "Medical Biology")
            template3 += `
      <div class="speaker revealFromBottom" style="background: url('${speaker.ProfilePic ? speaker.ProfilePic[0].url : null
                }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;
        else if (speaker.SessionType === "Cell Biology")
            template4 += `
      <div class="speaker revealFromBottom" style="background: url('${speaker.ProfilePic ? speaker.ProfilePic[0].url : null
                }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;

        const speakers = document.getElementById("speakers");
        const [speakersRow] = speakers.getElementsByClassName("speakersRow");
        speakersRow.innerHTML = template1;

        const panel1 = document.getElementById("panel1");
        const [panel1Row] = panel1.getElementsByClassName("speakersRow");
        panel1Row.innerHTML = template2;

        const panel2 = document.getElementById("panel2");
        const [panel2Row] = panel2.getElementsByClassName("speakersRow");
        panel2Row.innerHTML = template3;

        const panel3 = document.getElementById("panel3");
        const [panel3Row] = panel3.getElementsByClassName("speakersRow");
        panel3Row.innerHTML = template4;

   
    });
};

const updateWorkshops = async () => {
    workshops = await getRecords("Workshops");
    workshops = sortByOrder(workshops);
    let template = "";
    workshops.forEach((workshop, index) => {
        template += `
    <div class="blogCard">
      <div class="blogPic" style="background: url(${workshop.Poster[0].url}) center/cover;">
        <div class="blogPicTint"></div>
      </div>
      <div class="blogContent">
        <h3>${workshop.Name}</h3>
        <button onclick="openModalWithMessage('${workshop.Name}', '${workshop.Description}', '${workshop.Conducted}')">Read More</button>
      </div>
    </div>
    `;
    });
  document.getElementById("workshop").innerHTML = template;

    // animateDynamicElements();
};

const updateCollaborators = async () => {
    collaborators = await getRecords("Collaborators");
    collaborators = sortByOrder(collaborators);
    let template = "";
    collaborators.forEach((collaborator, index) => {
        template += `
    <a href="${collaborator.Link}" target="_blank">
    <img src="${collaborator.Logo[0].url}" alt="Collaborator" />
    </a>
    <br>
    <h3>${collaborator.Name}</h3>
    <p>${collaborator.Description}</p>
    `;
    });
    document.getElementById("collaborators").innerHTML = template;

    // animateDynamicElements();
};

const updatePublications = async () => {
    publications = await getRecords("Publications");
    publications = sortByOrder(publications);
    let template = "";

    //////////////////////////////////////// change css styling (display)///////////////////////////////////////
    publications.forEach((publication, index) => {
        template += `
    <a href="${publication.Link}" target="_blank">
    <img src="${publication.invertedLogo[0].url}" alt="Publication" class="pubimg" style="display: block" />
    </s>
    `;
    });
    document.getElementById("publications").innerHTML = template;

    // animateDynamicElements();
};
