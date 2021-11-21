//////////////////////////////////////////////////////TO FETCH AIRTABLE DATA OF EACH RC////////////////////////////////////////////////////////////////////////

let Airtable = require("airtable");

let AirtableBaseID = sessionStorage.getItem("ConferenceID");
let AirtableBaseName = sessionStorage.getItem("ConferenceName");

if (AirtableBaseID===null){
  window.location.replace("https://thedarwin.in/");
}
// Airtable credentials
const metaData = {
  baseID: AirtableBaseID,
  baseName: AirtableBaseName,
  tablesCount: 4,
  tables: [
    "Conference overview",
    "Speakers&Panelist",
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
  updateSpeakers();
  updateWorkshops();
  // updateTestimonials();
  // updatePublications();
  updateCollaborators();
  updateDetails();
  // getHighlights();
  // updateFAQs();
  // updateBenefits();
};

const getRecords = async (tableName) => {
  let base = new Airtable({ apiKey: "key6ft2ZcKHUhULL5" }).base(
    AirtableBaseID
  );
  const fields = [];
  const records = await base(tableName)
    .select({
      // filterByFormula: "( visible = TRUE() )",
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
  websiteDetails = await getRecords("WebsiteDetails");
  websiteDetails = sortByOrder(websiteDetails);
  let template1 = "";
  let template2 = "";
  let template3 = "";
  let template4 = "";
  let template5 = "";
  let template6 = "";
  let template7 = "";
  let template8 = "";
  let template9 = "";
  let temp1ate10="";

  let RCname="";

  // RC logo
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "RCLogo") {
      template5 += `
        <img src= "${websiteDetails[index].Attachments[0].url}" alt="darwin RC logo" />
        `;
      temp1ate10 +=`
        <a href="#">
       <img src= "${websiteDetails[index].Attachments[0].url}" alt="darwin RC logo"  />
        </a>
      `
    }
  });



  //RC name
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "RCName") {
      RCname = websiteDetails[index].Information;
      template4 += `
        <h1>${websiteDetails[index].Information}</h1>
        `;
    }
  });

  //date time and timezone
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "DateTime&Timezone") {
      template1 += `
        <p><i class="fa fa-calendar"></i>${websiteDetails[index].Information}</p>
        `;
    }
  });

  //language
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "Language") {
      template2 += `
         <p><i class="fa fa-language"></i>${websiteDetails[index].Information}</p>
         `;
    }
  });

  //register now link
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "RegisterLink") {
      template3 += `
       <div class="btngreen">
            <i class="fa fa-sign-in" style="padding-right: 1px"></i>
            <a href=${websiteDetails[index].Information} target="_blank"
              >Register Now</a
            >
          </div>
         `;
    }
  });

  //lab details
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "LabDetails") {
      template6 += `
        <div>
        <h3 class="sub-heading">Lab Details</h3>
         <p>${websiteDetails[index].Information}</p>
         </div>
         `;
    }
  });

  // About Organizing Team
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "OrganizingTeam") {
      template7 += `
        <div>
        <h3 class="sub-heading">Organising Team</h3>
         <p>${websiteDetails[index].Information}</p>
         </div>
         `;
    }
  });

  // Lab logo
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "LabLogo") {
      template8 += `
      <img src= "${websiteDetails[index].Attachments[0].url}" alt="darwin RC logo" />
        `;
    }
  });

  //About Lab
  websiteDetails.forEach((detail, index) => {
    if (detail.Name === "About") {
      template9 += `
        <div>
        <h3>About ${RCname}</h3>
         <p>${websiteDetails[index].Information}</p>
         </div>
         `;
    }
  });

  document.querySelector("#labLogo").innerHTML = template5;

  document.querySelector("#RCSmallLogo").innerHTML = temp1ate10;

  document.querySelector("#RCName").innerHTML = template4;

  document.querySelector("#conferenceDate").innerHTML = template1;

  document.querySelector("#conferenceLanguage").innerHTML = template2;

  document.querySelector("#regLink").innerHTML = template3;

  document.querySelector("#labDetails").innerHTML = template6;

  document.querySelector("#LabOrganizingTeam").innerHTML = template7;

  document.querySelector("#aboutPicLab").innerHTML = template8;

  document.querySelector("#aboutLab").innerHTML = template9;
};



const updateSpeakers = async () => {
  speakerProfiles = await getRecords("Speakers&Panelist");
  speakerProfiles = sortByOrder(speakerProfiles);
  let template1 = "";
  let template2 = "";
  // let template3 = "";
  // let template4 = "";

  speakerProfiles.forEach((speaker, index) => {
    if (speaker.SessionType === "Talk")
      template1 += `
      <div class="speaker revealFromBottom" style="background: url('${
        speaker.ProfilePic ? speaker.ProfilePic[0].url : null
      }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription, speakerProfiles[${index}].Designation)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;
    else if (speaker.SessionType === "Panel")
      template2 += `
      <div class="speaker revealFromBottom" style="background: url('${
        speaker.ProfilePic ? speaker.ProfilePic[0].url : null
      }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;
    // else if (speaker.SessionType === "Medical Biology")
    //   template3 += `
    //   <div class="speaker revealFromBottom" style="background: url('${
    //     speaker.ProfilePic ? speaker.ProfilePic[0].url : null
    //   }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
    //     <div class="speakerTint">
    //       <h3>${speaker.Name}</h3>
    //       <p>${speaker.Designation}</p>
    //     </div>
    //   </div>
    //   `;
    // else if (speaker.SessionType === "Cell Biology")
    //   template4 += `
    //   <div class="speaker revealFromBottom" style="background: url('${
    //     speaker.ProfilePic ? speaker.ProfilePic[0].url : null
    //   }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
    //     <div class="speakerTint">
    //       <h3>${speaker.Name}</h3>
    //       <p>${speaker.Designation}</p>
    //     </div>
    //   </div>
    //   `;

    const speakers = document.getElementById("speakers");
    const [speakersRow] = speakers.getElementsByClassName("speakersRow");
    speakersRow.innerHTML = template1;

    const panel1 = document.getElementById("cf");
    const [panel1Row] = panel1.getElementsByClassName("speakersRow");
    panel1Row.innerHTML = template2;

    // const panel2 = document.getElementById("panel2");
    // const [panel2Row] = panel2.getElementsByClassName("speakersRow");
    // panel2Row.innerHTML = template3;

    // const panel3 = document.getElementById("panel3");
    // const [panel3Row] = panel3.getElementsByClassName("speakersRow");
    // panel3Row.innerHTML = template4;
  });
};

const updateWorkshops = async () => {

  workshops = await getRecords("Workshops");
  workshops = sortByOrder(workshops);
  let template = "";
  let count=0;
  let unchekedCount = 0;
  workshops.forEach((workshop, index) => {
    count++;
    if (workshop.Visible){
      console.log(index)
      console.log(workshop);

      console.log("chechked");
    }
    //unchecked
   else{
      console.log(index)
      console.log(workshop);
      console.log("unchecked");
      unchekedCount++;
    }
    // if ( workshop.visible ) {
    //   console.log("Workshops are unticked!");
    // }
    if(workshop.Visible){
      template += `
    <div class="blogCard">
      <div class="blogPic" style="background: url(${workshop.Poster[0].url}) center/cover;">
        <div class="blogPicTint"></div>
      </div>
      <div class="blogContent">
        <h3>${workshop.Title}</h3>
        <button onclick="openModalWithMessage('${workshop.Title}', '${workshop.Description}', '${workshop.Conductedby}')">Read More</button>
      </div>
    </div>
    `;
    }else{
      template+= ``;
    }

  });
  if(count== unchekedCount){
    console.log("all entries are unchecked");
    //all rows are unchecked
    //hide the section
  }
 
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
