"use strict";

const regex_temperature = /(?:° ?)?[0-9]+(?:\.[0-9]+)? ?°? ?[fF]\b/g;
const regex_inch = /[0-9]+(?:\.[0-9]+)? ?(?:in(?:ch|s)?\b|")/g;
const regex_feet = /[0-9]+(?:\.[0-9]+)? ?(?:ft|feet|foot|feets)\b/g;
const regex_yard = /[0-9]+(?:\.[0-9]+)? ?(?:yd|yard|yards)\b/g;
const regex_miles = /[0-9]+(?:\.[0-9]+)? ?mi(?:le)?s?\b/g;
const regex_mph = /[0-9]+(?:\.[0-9]+)? ?(?:mph|miles per hour)\b/g;
const regex_knots = /[0-9]+(?:\.[0-9]+)? ?(?:knots|knot|kn)\b/g;
const regex_acres = /[0-9]+(?:\.[0-9]+)? ?(?:acres|acre|ac)\b/g;
const regex_barrel = /[0-9]+(?:\.[0-9]+)? ?(?:barrels|barrel|bbl)\b/g;
const regex_gallons = /[0-9]+(?:\.[0-9]+)? ?gal(?:lon)?s?\b/g;

const ignoredNodeTypes = ['style','dummyTagForHappyArray'];

function cleanTemperature(input){
  return input.replace(/[Ff]$/, '').replace('°','').replace(' ','');
}

function cleanInput(input, removables){
    removables.forEach((rep) => { input.replace(rep, '')});
    input.replace(' ','');
    return input;
}

function cleanInch(input){
  return cleanInput(input, ['inch','in','"']);
}

function cleanFeet(input){
  return cleanInput(input, ['feets','feet','foot','ft']);
  // I know that feets is not a word, but you know the internet.
}

function cleanMiles(input){
  return cleanInput(input, ['miles','mile','mi']);
}

function cleanYard(input){
  return cleanInput(input, ['yards','yard','yd']);
}

function cleanMph(input){
  return cleanInput(input, ['miles per hour','mph']);
}

function cleanKnots(input){
  return cleanInput(input, ['knots','knot','kn']);
}

function cleanAcres(input){
  return cleanInput(input, ['acres','acre','ac']);
}

function cleanBarrels(input){
  return cleanInput(input, ['barrels','barrel','bbl']);
}

function cleanGallon(input){
  return cleanInput(input, ['gallons','gallon','gal']);
}

function fahrenheit2Celsius(input) {
    var f = parseFloat(cleanTemperature(input));
    var result = Math.round((f - 32) / 1.8);
    return result + "° C";
}

function inch2Centimeters(input) {
    var f = parseFloat(cleanInch(input));
    return Math.round(f * 2.54) + " cm";
}

function feet2Meters(input) {
    var f = parseFloat(cleanFeet(input));
    var result = f * 0.3048;
    return Math.round(result) + " m";
}

function yard2Meters(input) {
    var f = parseFloat(cleanYard(input));
    var result = f * 0.9144;
    return Math.round(result) + " m";
}

function miles2Km(input) {
    var f = parseFloat(cleanMiles(input));
    var result = f * 1.609344;
    return Math.round(result) + " km";
}

function mph2kmh(input) {
    var f = parseFloat(cleanMph(input));
    var result = f * 1.609344;
    return Math.round(result) + " km/h";
}

function knots2kmh(input) {
    var f = parseFloat(cleanKnots(input));
    var result = f * 1.852;
    return Math.round(result) + " km/h";
}

function acres2sqm(input) {
    var f = parseFloat(cleanAcres(input));
    var result = f * 4047;
    return Math.round(result) + " m²";
}

function barrel2litres(input) {
    var f = parseFloat(cleanBarrels(input));
    var result = Math.round(f * 158.987);
    return result == 1 ? result + " litre" : result + " litres";
}

function gallon2litres(input) {
    var f = parseFloat(cleanGallon(input));
    var result = Math.round(f * 3.785);
    return result == 1 ? result + " litre" : result + " litres";
}

function nodeFilter() {
    var b = this.nodeType == 3 && this.nodeName != 'SCRIPT' && this.nodeName != 'STYLE';
    // console.log("New node " + this + " of type " + this.nodeType + " and name " + this.nodeName + " => " + b);
    return b;
}

function makeNewText(original, replacement){
    return '<span title="' + original + '">' + replacement + '</span>';
}


$("body").find("*").contents().filter(nodeFilter).each(function() {
    let textNode = $(this);

    let nodeParentType = textNode.parent()[0].localName;
    if(ignoredNodeTypes.includes(nodeParentType) )
    {
        // console.log("Skipped over node type: " + nodeParentType);
        return;
    }
    let text = textNode.text();

    for (const match of text.matchAll(regex_yard)){
      text = text.replaceAll(match[0], makeNewText(match[0], yard2Meters(match[0])));
    }

    for (const match of text.matchAll(regex_temperature)){
      text = text.replaceAll(match[0], makeNewText(match[0], fahrenheit2Celsius(match[0])));
    }

    for (const match of text.matchAll(regex_inch)){
      text = text.replaceAll(match[0], makeNewText(match[0], inch2Centimeters(match[0])));
    }

    for (const match of text.matchAll(regex_miles)){
      text = text.replaceAll(match[0], makeNewText(match[0], miles2Km(match[0])));
    }

    for (const match of text.matchAll(regex_feet)){
      text = text.replaceAll(match[0], makeNewText(match[0], feet2Meters(match[0])));
    }

    for (const match of text.matchAll(regex_mph)){
      text = text.replaceAll(match[0], makeNewText(match[0], mph2kmh(match[0])));
    }

    for (const match of text.matchAll(regex_knots)){
      text = text.replaceAll(match[0], makeNewText(match[0], knots2kmh(match[0])));
    }

    for (const match of text.matchAll(regex_acres)){
      text = text.replaceAll(match[0], makeNewText(match[0], acres2sqm(match[0])));
    }

    for (const match of text.matchAll(regex_barrel)){
      text = text.replaceAll(match[0], makeNewText(match[0], barrel2litres(match[0])));
    }

    for (const match of text.matchAll(regex_gallons)){
      text = text.replaceAll(match[0], makeNewText(match[0], gallon2litres(match[0])));
    }

    textNode.replaceWith(text);
});
