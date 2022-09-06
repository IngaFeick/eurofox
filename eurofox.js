var regex_temperature = /(° ?)?[0-9]+(\.[0-9]+)? ?°? ?[fF]/g
var regex_inch = /(° ?)?[0-9]+(\.[0-9]+)? ?°? ?in(ch)?/g

function cleanTemperature(input){
  return input.replace(/[Ff]$/, '').replace('°','').replace(' ','')
}

function cleanInch(input){
  return input.replace('inch', '').replace('in','').replace(' ','')
}

function toCelsius(input) {
    var f = parseFloat(cleanTemperature(input), 10);
    c = Math.floor((f - 32) / 1.8);
    return c + "° C"
}

function toCentimeters(input) {
    var f = parseFloat(cleanInch(input), 10);
    return Math.floor(f * 2.54) + "cm"
}

function textNodeFilter() {
    return this.nodeType == 3 && this.nodeName.toLowerCase() != 'script' && this.nodeName.toLowerCase() != 'style'
}

function makeNewText(original, replacement){
    return '<span title="' + original + '">' + replacement + '</span>'
}

$("body").find("*").contents().filter(textNodeFilter).each(function(index) {
    var textNode = $(this);
    var nodeParent = textNode.parent()[0].localName
    var text = textNode.text();
    console.log("Node " + nodeParent + " with text '" + text);
    matches = text.match(regex_temperature);
    // console.log(" => temperature matches: " + matches);
    if (matches) {
        textNode.replaceWith(text.replace(regex_temperature, makeNewText(matches[0], toCelsius(matches[0]))))
    }
    matches = text.match(regex_inch);
    console.log(" => inch matches: " + matches);
    if (matches) {
        textNode.replaceWith(text.replace(regex_inch, makeNewText(matches[0], toCentimeters(matches[0]))))
    }
});
