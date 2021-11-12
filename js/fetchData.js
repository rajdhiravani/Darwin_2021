let Airtable = require("airtable");
// Airtable credentials
const metaData = {
  baseID: "appRcXPwopPZ85HbJ",
  baseName: "Darwin 2021",
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
    "RC Partners Easy Access",
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
let RCPartner = [];

const getAirtableData = async () => {
  updateConference();
  updateSpeakers();
  updatePreevents();
  updateTestimonials();
  updatePublications();
  updateCollaborators();
  getHighlights();
  getRCInfo();
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
  let template5 = "";

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
    else if (speaker.SessionType === "BioArt")
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
    else if (speaker.SessionType === "Medical Biology")
      template3 += `
      <div class="speaker revealFromBottom" style="background: url('${
        speaker.ProfilePic ? speaker.ProfilePic[0].url : null
      }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;
    else if (speaker.SessionType === "Cell Biology")
      template4 += `
      <div class="speaker revealFromBottom" style="background: url('${
        speaker.ProfilePic ? speaker.ProfilePic[0].url : null
      }') center/cover" onclick="openModalWithMessage(speakerProfiles[${index}].Name,speakerProfiles[${index}].ProfileDescription)">
        <div class="speakerTint">
          <h3>${speaker.Name}</h3>
          <p>${speaker.Designation}</p>
        </div>
      </div>
      `;
    else if (speaker.SessionType === "Keynote")
      template5 += `
      <div class="speaker revealFromBottom" style="background: url('${
        speaker.ProfilePic ? speaker.ProfilePic[0].url : null
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

    const keynote = document.getElementById("keynote");
    const [keynoteRow] = keynote.getElementsByClassName("speakersRow");
    keynoteRow.innerHTML = template5;

    // const panel3 = document.getElementById("panel3");
    // const [panel3Row] = panel3.getElementsByClassName("speakersRow");
    // panel3Row.innerHTML = template4;

    // animateDynamicElements();

    // template += `
    // <div
    //   class="speakerCard"
    //   style="background: url(${speaker.ProfilePic[0].url}) center/cover;"
    //   onclick="openSpeakerWithMessage(speakerProfiles[${index}].Name, speakerProfiles[${index}].ProfileDescription, speakerProfiles[${index}].Designation)"
    // >
    //   <div class="speakerTint">
    //     <h3>${speaker.Name}</h3>
    //   </div>
    // </div>
    // `;
  });
  // document.getElementsByClassName("speakersRow")[0].innerHTML = template1;

  // animateDynamicElements();
};

// RC
const getRCInfo = async () => {
  RCPartner = await getRecords("RC Partners Easy Access");
  RCPartner = sortByOrder(RCPartner);
  let template = "";
  let rcID = "";
  RCPartner.forEach((event, index) => {
    rcID = event.RC_ID;
    template += `
    <div class="blogCard">
      <div class="blogPic" style="background: url(${event.Poster[0].url})">
      <div class="blogPicTint"></div>

    </div>
      <div class="blogContent">
        <h3>${event.Name}</h3>
        <button class="RCBtn" onclick="getConferenceName('${rcID}')">View</button><br><br>
      </div>
  </div>
    `;
  });
  document.getElementById("rcInfo").innerHTML = template;

  // animateDynamicElements();
};
// END OF RC

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
        <button onclick="openModalWithMessage('${event.Name}', '${event.Description}')">Read More</button>
      </div>
    </div>
    `;
  });
  document.querySelector("#preEvents > .blogsRow").innerHTML = template;

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

// const getHighlights = async ()=> {
//   highlights = await getRecords("Highlights");
//   console.log(highlights);
//   // highlights = sortByOrder(highlights);
//   let template = "";
//   let template1= "";

//   highlights.forEach((highlight, index) => {

//     console.log(index);
//     console.log(highlight.Image[0].url);
//     template += `
//     <div class="slide" data-slide="${index}">
//               <div
//                 class="content"
//                 style="background: url(${highlight.Image[0].url}) center/cover"
//               ></div>
//     </div>
//     `;
//     template1+= `
//       <div class="indicator" data-slide="${index}"></div>
//     `
//   });
//   document.getElementById("highlights").innerHTML = template;
//   document.getElementById("indicators").innerHTML =  template1;
// }

// const updateFAQs = async () => {
//   faqs = await getRecords("FAQs");
//   faqs = sortByOrder(faqs);
//   let template = "";
//   faqs.forEach((faq, index) => {
//     template += `
//     <div class="faqCard revealFromBottom">
//       <button class="faqQue" onclick="openFAQ(${index})" >
//         ${faq.Question} <i class="fa fa-plus"></i>
//       </button>
//       <div class="faqAns" style="display: none">
//         <p>${faq.Answer}</p>
//       </div>
//     </div>
//     `;
//   });
//   document.getElementById("faqs").innerHTML = template;
//   // animateDynamicElements();
// };

// const openFAQ = (index) => {
//   const faqQuestionElements = document.getElementsByClassName("faqQue");
//   const faqAnswerElements = document.getElementsByClassName("faqAns");
//   for (let i = 0; i < faqQuestionElements.length; i++) {
//     if (i === index && faqAnswerElements[i].style.display === "none") {
//       faqQuestionElements[i].classList.add("active");
//       faqAnswerElements[i].style.display = "block";
//     } else {
//       faqQuestionElements[i].classList.remove("active");
//       faqAnswerElements[i].style.display = "none";
//     }
//   }
// };

// const updateBenefits = async () => {
//   benefits = await getRecords("Benefits");
//   benefits = sortByOrder(benefits);
//   let template1 = "";
//   let template2 = "";
//   benefits.forEach((benefit) => {
//     if (benefit.MainConference) {
//       template1 += `
//       <li>${benefit.Name}</li>
//       `;
//     }
//     if (benefit.ResearchSymposium) {
//       template2 += `
//       <li>${benefit.Name}</li>
//       `;
//     }
//   });
//   document.getElementById("mainConference").innerHTML = template1;
//   document.getElementById("researchSymposium").innerHTML = template2;
// };

// const updateSchedule = async () => {
//   schedule = await getRecords("Schedule calendar");
//   schedule = sortByOrder(schedule);
//   let template = "";
//   let responsive = "";
//   let scheduleTable = [];
//   template += `
//   <table>
//     <tr>
//       <th></th>
//       <th>Day 1</th>
//       <th>Day 2</th>
//       <th>Day 3</th>
//       <th>Day 4</th>
//     </tr>
//   `;

//   let day1, day1desc, day2, day2desc, day3, day3desc, day4, day4desc;
//   schedule.forEach((schedule) => {
//     day1 = schedule.Day1 ? schedule.Day1 : "<span>-</span>";
//     day1desc = schedule.Day1_description ? schedule.Day1_description : "";
//     day2 = schedule.Day2 ? schedule.Day2 : "<span>-</span>";
//     day2desc = schedule.Day2_description ? schedule.Day2_description : "";
//     day3 = schedule.Day3 ? schedule.Day3 : "<span>-</span>";
//     day3desc = schedule.Day3_description ? schedule.Day3_description : "";
//     day4 = schedule.Day4 ? schedule.Day4 : "<span>-</span>";
//     day4desc = schedule.Day4_description ? schedule.Day4_description : "";

//     scheduleTable.push([
//       schedule.Timing,
//       day1,
//       day1desc,
//       day2,
//       day2desc,
//       day3,
//       day3desc,
//       day4,
//       day4desc,
//     ]);
//   });

//   for (let i = 0; i < scheduleTable.length; i++) {
//     template += `
//       <tr>
//         <th>${scheduleTable[i][0]}</th>
//         <td>${scheduleTable[i][1]} <span>${scheduleTable[i][2]}</span></td>
//         <td>${scheduleTable[i][3]} <span>${scheduleTable[i][4]}</span></td>
//         <td>${scheduleTable[i][5]} <span>${scheduleTable[i][6]}</span></td>
//         <td>${scheduleTable[i][7]} <span>${scheduleTable[i][8]}</span></td>
//       </tr>
//     `;
//   }

//   for (let i = 0; i < 4; i++) {
//     responsive += `
//     <table>
//       <tr>
//         <th colspan="2">Day ${i + 1}</th>
//       </tr>
//     `;
//     for (let j = 0; j < scheduleTable.length; j++) {
//       if (scheduleTable[j][2 * (i + 1) - 1] === "<span>-</span>") continue;
//       responsive += `
//         <tr>
//           <td>${scheduleTable[j][2 * (i + 1) - 1]} <span>${
//         scheduleTable[j][2 * (i + 1)]
//       }</span></td>
//           <td>${scheduleTable[j][0]}</td>
//         </tr>
//       `;
//     }
//     responsive += `
//     </table>
//     `;
//   }
//   template += "</table>";

//   document.getElementById("schedule").innerHTML = template;
//   document.getElementById("scheduleResponsive").innerHTML = responsive;
// };

// const update2019 = async () => {
//   darwin2019 = await getRecords("Darwin 2019");
//   darwin2019 = sortByOrder(darwin2019);
//   let template = "";
//   darwin2019.forEach((highlight) => {
//     template += `
//     <div class="highlightCard" style="background: url('${highlight.Attachments[0].url}') center/cover"  >
//       <div class="highlightTint">
//         <h3>${highlight.Name}</h3>
//       </div>
//     </div>
//     `;
//   });
//   document.getElementById("highlights").innerHTML = template;
// };
