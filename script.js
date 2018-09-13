const TARGET = document.querySelector(".result-wrapper");

const BUTTON = document.querySelector("#generate");

// Generate DEC to ASCII Table for informational purposes
function generateDecAsciiTable() {
    "use strict";
    // Most common DEC to ASCII codes
    let start = 33;
    let end = 125;

    let decAsciiList = [];

    while (start <= end) {
        let el = {};
        el.dec = start;
        el.ascii = String.fromCharCode(start);
        decAsciiList.push(el);
        start = start + 1;
    }
    return decAsciiList;
}

// Generate random character between interval (min, max)
function getRandomInt(min, max) {
    "use strict";
    return Math.floor(
        Math.random() * (Math.floor(max) - Math.ceil(min))
    ) + Math.ceil(min);
}

// Generate a DEC character and convert it to ASCII
// skipChars = list of DEC characters to ignore
function generateCharacter() {
    "use strict";
    let skipCharslist = [
        34, 39, 43, 44, 45, 46, 47, 58,
        59, 60, 61, 62, 63, 94, 96, 124
    ];
    let charRandom = getRandomInt(33, 125);

    // If character 'charRandom' is on skipCharslist it will be ignored and
    // generateCharacter() will be called again
    if (skipCharslist.indexOf(charRandom) >= 0) {
        return generateCharacter();
    } else {
        return String.fromCharCode(charRandom); //converte DEC para ASCII
    }
}

// Gernerates a string of 'size' characters
function generatePass(size) {
    "use strict";
    let result = "";
    let i = 0;

    while (i < size) {
        let char = generateCharacter();
        result = result + char;
        i = i + 1;
    }
    return result;
}

// Print out the string to target
function printResult(target) {
    "use strict";
    let result;
    let tip;

    //create new result element if not exists
    if (document.querySelector(".result") === null) {
        // Create Result Node
        result = document.createElement("pre");
        result.className = "result";
        target.appendChild(result);

        tip = document.createElement("span");
        tip.className = "tip";

        // Add Tip
        target.appendChild(tip);
    }
    result = document.querySelector(".result");

    document.querySelector(".tip").innerText = "Click to copy on Clipboard";

    window.getSelection().removeAllRanges(); //Remove Selection
    let length = document.querySelector("#maxLength").value;
    result.innerText = generatePass(length);
}

// Select Result Password to Paste
function selectAndCopyText(target) {
    "use strict";

    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(target.childNodes[1]);
    selection.removeAllRanges();
    selection.addRange(range);

    document.querySelector(".tip").innerText = "Password copied to Clipboard";

    document.execCommand("copy"); //Copy to Clipboard
}

// Select and copy text after click on TARGET
TARGET.addEventListener("click", () => selectAndCopyText(TARGET));

// Adds a listener to BUTTON "click"
BUTTON.addEventListener("click", () => printResult(TARGET));
