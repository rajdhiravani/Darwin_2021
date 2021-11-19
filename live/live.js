// let Airtable = require("airtable");

async function checkFeedback(email) {
    let base = new Airtable({ apiKey: "keyiZXGBC4056oZ5W" }).base(
        "app8my77Rrfg25nyz"
    );
    const fields = [];
    const records = await base("Feedback form")
        .select({
        filterByFormula: `{Email ID} = "${email}"`,
        })
        .all();
    records.forEach(function (record) {
        fields.push(record.fields);
    });
    if(fields.length > 0) return true;
    return false;
}