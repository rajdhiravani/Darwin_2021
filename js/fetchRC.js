//////////////////////////////////////////////////////TO FETCH AIRTABLE DATA OF EACH RC////////////////////////////////////////////////////////////////////////


let Airtable = require("airtable");
const { base } = require("./airtable.browser");

////////////////////////////get URL param///////////////////////////
currentURL = window.location.href;
// console.log(currentURL);

function getQueryParam(name, url) {
  var q = url.match(new RegExp('[?&]' + name + '=([^&#]*)'));
  return q && q[1];
}
var urlName = getQueryParam('rc', currentURL);
//eg url: https://thedarwin.in/?rc=stemi
//output: conferenceName= stemi


var conferenceName;
var conferenceID;
//////////////convert RC name to Conference name (base name) and assign base id to each RC base///////////////

//put url param name as case
switch (urlName) {
  case "stemi":
    conferenceName = "Darwin 2021 RC - STEMi Makers Africa";
    conferenceID = "appV8InzyT6tEQHtP";
    break;
    // keep adding here on addition of more bases
  case "xyz":
    conferenceName= "xyz RC";
    conferenceID= "";



  default:
    // defaults to original Darwin base
    conferenceName = "Darwin 2021"
    conferenceID = "appRcXPwopPZ85HbJ";
}

// Airtable credentials
const metaData = {
    baseID: conferenceID,
    baseName: conferenceName,
    tablesCount: 11,
    tables: [
        "Conference overview",
        "Speaker profiles",
        "Pre-Event",
        "Collaborators",
        "Testimonials",
        "Schedule calendar",
        "Publications",
        "FAQs",
        "Darwin 2019",
        "Benefits",
        "Highlights",
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
    updateSpeakers();
    updatePreevents();
    updateTestimonials();
    updatePublications();
    updateCollaborators();
    getHighlights();
    // updateFAQs();
    // updateBenefits();
};

const getRecords = async (tableName) => {
    let base = new Airtable({ apiKey: "keyiZXGBC4056oZ5W" }).base(
        "appRcXPwopPZ85HbJ"
    );
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

const updateConference = async () => {
    conferenceOverview = await getRecords("Conference overview");
    conferenceOverview = sortByOrder(conferenceOverview);
    let template = "";

    conferenceOverview.forEach((conference, index) => {
        template += `
    <div class="blogCard">
      <div class="blogPic" style="background: url('${conference.Image[0].url}') center/cover" >
        <div class="blogPicTint"></div>
      </div>
      <div class="blogContent">
        <h3>${conference.Name}</h3>
        <button onclick="openModalWithMessage('${conference.Name}', '${conference.Description}', '${conference.Topic}', '${conference.Speakers}')">Read More</button>
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

const updatePreevents = async () => {
    preEvents = await getRecords("Pre-Event");
    preEvents = sortByOrder(preEvents);
    let template = "";
    preEvents.forEach((event, index) => {
        template += `
    <div class="blogCard">
      <div class="blogPic" style="background: url(${event.Poster[0].url}) center/cover;">
        <div class="blogPicTint"></div>
      </div>
      <div class="blogContent">
        <h3>${event.Name}</h3>
        <button onclick="openModalWithMessage('${event.Name}', '${event.Description}', '${event.Topic}', '${event.Speakers}')">Read More</button>
      </div>
    </div>
    `;
    });
    document.getElementById("preEvents").innerHTML = template;

    // animateDynamicElements();
};

const updateTestimonials = async () => {
    testimonials = await getRecords("Testimonials");
    testimonials = sortByOrder(testimonials);
    let template = "";
    testimonials.forEach((testimonial, index) => {
        template += `
    <div class="testimonialCard">
      <img src="./img/quotes.png" alt="Quotes" />
      <h3>${testimonial.Description}</h3>
      <div class="testimonialBy">
        <h4>${testimonial.Name}</h4>
        <p>${testimonial.Designation}</p>
      </div>
    </div>
    `;
    });
    document.getElementById("testimonials").innerHTML = template;

    const testimonialsScroll = () => {
        const testimonialsSection = document.getElementById("testimonials");
        const testCard =
            document.getElementsByClassName("testimonialCard")[0].clientWidth;

        let i = 0;
        setInterval(() => {
            if (i > (testCard * testimonials.length) / testimonialsSection.scrollLeft)
                i = 0;
            else i = testimonialsSection.scrollLeft + testCard;

            testimonialsSection.scroll({
                top: 0,
                left: i,
                behavior: "smooth",
            });
        }, 2000);
    };

    testimonialsScroll();

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
    `;
    });
    document.getElementById("collaborators").innerHTML = template;

    // animateDynamicElements();
};

const updatePublications = async () => {
    publications = await getRecords("Publications");
    publications = sortByOrder(publications);
    let template = "";
    publications.forEach((publication, index) => {
        template += `
    <a href="${publication.Link}" target="_blank">
    <img src="${publication.invertedLogo[0].url}" alt="Publication" class="pubimg" />
    </s>
    `;
    });
    document.getElementById("publications").innerHTML = template;

    // animateDynamicElements();
};

const updateBlogs = async () => {
    blogs = await getRecords("Blogs");
    blogs = sortByOrder(blogs);
    let template = "";
    blogs.forEach((blog, index) => {
        template += `
    <div
      class="blogCard"
      onclick="window.open('${blog.Link}')"
    >
      <div class="blogPic" style="background: url(${blog.Image[0].url}) center/cover">
        <div class="blogPicTint"></div>
      </div>
      <div class="blogContent">
        <h3>${blog.Title}</h3>
        <div class="blogAuthor">
          <div class="blogAuthorPic" style="background: url(${blog["Author Pic"][0].url}) center/cover"></div>
          <div class="blogAuthorDetails">
            <h4>${blog.Author}</h4>
            <p>Posted on: ${blog.Date}</p>
          </div>
        </div>
      </div>
    </div>
    `;
    });
    document.querySelector("#blogs").innerHTML = template;

    // animateDynamicElements();
};
