console.log("URL PARAMETER");
currentURL= window.location.href;
console.log(currentURL);

function getQueryParam(name, url ) {
    var q = url.match(new RegExp('[?&]' + name + '=([^&#]*)'));
    return q && q[1];
}
var conferenceName = getQueryParam('rc', currentURL);
console.log(conferenceName);

