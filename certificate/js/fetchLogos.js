let Airtable = require("airtable");
// Airtable credentials
const metaData = {
  baseID: "appRcXPwopPZ85HbJ",
  baseName: "Darwin 2021",
  tablesCount: 1,
  tables: ["Certificate Logos"],
};

let certificateLogos = [];

const getAirtableData = async () => {
  getLogos();
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

// const getLogos = async () => {
//   certificateLogos = await getRecords("Certificate Logos");
//   certificateLogos = sortByOrder(certificateLogos);
//   console.log(certificateLogos);
//   let template = "";

//   certificateLogos.forEach((logo, index) => {
//     template += `
//            <img style="height:50px; margin:15px;" src="${logo.Logo[0].url}" alt="${logo.Name}" />
//        `;
//   });

//   //   document.getElementById("certificateLogo").innerHTML = template;
//   document.getElementsByClassName("partnerStrip").innerHTML = template;

//   //   animateDynamicElements();
// };

const getLogos = async () => {
  certificateLogos = await getRecords("Certificate Logos");
  certificateLogos = sortByOrder(certificateLogos);
  console.log(certificateLogos);
  let template = "";
  certificateLogos.forEach((logo, index) => {
    template += `
      <img  src="${logo.Logo[0].url}" alt="${logo.Name}" /> 
      `;
  });
  document.getElementById("certificateLogo").innerHTML = template;

  // animateDynamicElements();
};
