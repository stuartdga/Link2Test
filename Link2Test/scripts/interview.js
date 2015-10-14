function stopInterview() {
    try {
        if (typeof window.unumApp !== 'undefined' && window.unumApp !== null) {
            window.unumApp.removeWidget("interview");
        } else {
            removeDiv();
        }
    }
    catch (err) {
        console.log("stopInterview error:");
        console.log(err.message);
    }
};

function startInterview(benefit) {
    stopInterview();

    var linkSessionID = document.getElementById("linksessionid").value;
    var employerguid = document.getElementById("employerguid").value;
    var ssn = document.getElementById("ssn").value;
    var benefitControl = document.getElementById("benefit");
    var apiurl = document.getElementById("apiurl").value;

    // set overridden config values pertinent to the widget - apiurl and debugmode.
    window.unum_widget_config = { apiurl: apiurl, isDebug: true };

    var properties = null;

    if (linkSessionID !== '') {
        properties = {
            "BenefitType": benefit,
            "ReturnURL": window.location.href.split("?")[0].split("#")[0] + "?return=" + Date.now(),
            //"ExceptionURL": window.location.href.split("?")[0].split("#")[0] + "?exception=true",
            "LinkSessionID": linkSessionID
        };
    }
    else {
        properties = {
            "BenefitType": benefit,
            "EmployerGuid": employerguid,
            "ReturnURL": window.location.href.split("?")[0].split("#")[0] + "?return=" + Date.now(),
            //"ExceptionURL": window.location.href.split("?")[0].split("#")[0] + "?exception=true",
            "Employee": {
                "SSN": ssn
            }
        };
    }

    addDiv(properties);

    addScript(apiurl);

};

function addDiv(properties) {
    var interviewContainerDiv = null;
    switch (properties.BenefitType) {
        case "Whole Life":
            interviewContainerDiv = document.getElementById("WLContainer");
            break;
        case "Group Critical Illness":
            interviewContainerDiv = document.getElementById("GCIContainer");
            break;
        case "Group Accident":
            interviewContainerDiv = document.getElementById("GACCContainer");
    }
    //var interviewContainerDiv = document.getElementById("interviewContainer");
    var d = document.createElement("div");
    d.setAttribute('id', 'interview');
    d.setAttribute('data-unum', JSON.stringify(properties));
    interviewContainerDiv.appendChild(d);
};

function removeDiv() {
    var interviewDiv = document.getElementById("interview");
    if (interviewDiv !== null || interviewDiv !== 'undefined') {
        interviewDiv.parentNode.removeChild(interviewDiv);
    }
};

function addScript(url) {
    var s = document.createElement("script");
    s.setAttribute('src', url + 'unumApp.js');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('id', 'unumApp');
    document.getElementsByTagName('body')[0].appendChild(s);
};

function removeScript() {
    var script = document.getElementById("unumApp");
    if (script !== null)
        document.getElementsByTagName('body')[0].removeChild(script);
}
