var regex_temperature = /(° ?)?[0-9]+(\.[0-9]+)? ?°? ?[fF]\b/g
var regex_inch = /[0-9]+(\.[0-9]+)? ?in(ch)?\b/g
var regex_feet = /[0-9]+(\.[0-9]+)? ?(ft|feet|foot|feets)\b/g
var regex_yard = /[0-9]+(\.[0-9]+)? ?(yd|yard|yards)\b/g
var regex_miles = /[0-9]+(\.[0-9]+)? ?mi(le)?s?\b/g
var regex_mph = /[0-9]+(\.[0-9]+)? ?(mph|miles per hour)\b/g
var regex_knots = /[0-9]+(\.[0-9]+)? ?(knots|knot|kn)\b/g

function cleanTemperature(input){
  return input.replace(/[Ff]$/, '').replace('°','').replace(' ','')
}

function cleanInch(input){
  return input.replace('inch', '').replace('in','').replace(' ','')
}

function cleanFeet(input){
  return input.replace('feets', '').replace('feet', '').replace('foot', '').replace('ft','').replace(' ','')
}

function cleanMiles(input){
  return input.replace('miles', '').replace('mi','').replace('mile','').replace(' ','')
}

function cleanYard(input){
  return input.replace('yards', '').replace('yard','').replace('yd','').replace(' ','')
}

function cleanMph(input){
  return input.replace('miles per hour', '').replace('mps','').replace(' ','')
}

function cleanKnots(input){
  return input.replace('knots', '').replace('knot','').replace('kn','').replace(' ','')
}

function fahrenheit2Celsius(input) {
    var f = parseFloat(cleanTemperature(input), 10);
    c = Math.round((f - 32) / 1.8);
    return c + "° C"
}

function inch2Centimeters(input) {
    var f = parseFloat(cleanInch(input), 10);
    return Math.round(f * 2.54) + " cm"
}

function feet2Meters(input) {
    var f = parseFloat(cleanFeet(input), 10);
    var result = f * 0.3048;
    return Math.round(result) + " m"
}

function yard2Meters(input) {
    var f = parseFloat(cleanYard(input), 10);
    var result = f * 0.9144;
    return Math.round(result) + " m"
}

function miles2Km(input) {
    var f = parseFloat(cleanMiles(input), 10);
    var result = f * 1.609344;
    return Math.round(result) + " km"
}

function mph2kmh(input) {
    var f = parseFloat(cleanMph(input), 10);
    var result = f * 1.609344;
    return Math.round(result) + " km/h"
}

function knots2kmh(input) {
    var f = parseFloat(cleanKnots(input), 10);
    var result = f * 1.852;
    return Math.round(result) + " km/h"
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
        textNode.replaceWith(text.replace(regex_temperature, makeNewText(matches[0], fahrenheit2Celsius(matches[0]))))
    }
    matches = text.match(regex_inch);
    if (matches) {
        textNode.replaceWith(text.replace(regex_inch, makeNewText(matches[0], inch2Centimeters(matches[0]))))
    }
    matches = text.match(regex_miles);
    if (matches) {
        textNode.replaceWith(text.replace(regex_miles, makeNewText(matches[0], miles2Km(matches[0]))))
    }
    matches = text.match(regex_feet);
    if (matches) {
        textNode.replaceWith(text.replace(regex_feet, makeNewText(matches[0], feet2Meters(matches[0]))))
    }
    matches = text.match(regex_yard);
    if (matches) {
        textNode.replaceWith(text.replace(regex_yard, makeNewText(matches[0], yard2Meters(matches[0]))))
    }
    matches = text.match(regex_mph);
    if (matches) {
        textNode.replaceWith(text.replace(regex_mph, makeNewText(matches[0], mph2kmh(matches[0]))))
    }
    matches = text.match(regex_knots);
    if (matches) {
        textNode.replaceWith(text.replace(regex_knots, makeNewText(matches[0], knots2kmh(matches[0]))))
    }
});
