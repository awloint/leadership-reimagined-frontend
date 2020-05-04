window.intlTelInputGlobals.loadUtils("scripts/utils.js");
var input = document.querySelector("#phone");
window.intlTelInput(input, {
    // any initialisation options go here
    initialCountry: "ng",
    separateDialCode: true,
    hiddenInput: "full_phone",
    utilsScript: "scripts/utils.js"
});