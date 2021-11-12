let Airtable = require("airtable");

async function checkIfRegistered(email) {
  let base = new Airtable({ apiKey: "keyiZXGBC4056oZ5W" }).base(
    "app8my77Rrfg25nyz"
  );
  const fields = [];
  const records = await base("Attendee Registration")
    .select({
      filterByFormula: `{Email ID} = "${email}"`,
    })
    .all();
  records.forEach(function (record) {
    fields.push(record.fields);
  });
  return fields;
}