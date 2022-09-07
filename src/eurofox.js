"use strict";

const regex_temperature = /(?:° ?)?[0-9]+(?:\.[0-9]+)? ?°? ?[fF]\b/g;
const regex_inch = /(?<!")\b\d+\s?"|\d+(\.\d+)?((in|\s?inch(es)?)\b)/g;
const regex_feet = /\b[0-9]+(?:\.[0-9]+)? ?(?:ft|feet|foot|feets)\b/g;
const regex_yard = /\b[0-9]+(?:\.[0-9]+)? ?(?:yd|yard|yards)\b/g;
const regex_miles = /\b[0-9]+(?:\.[0-9]+)? ?mi(?:le)?s?\b/g;
const regex_mph = /\b[0-9]+(?:\.[0-9]+)? ?(?:mph|miles per hour)\b/g;
const regex_knots = /\b[0-9]+(?:\.[0-9]+)? ?(?:knots|knot|kn)\b/g;
const regex_acres = /\b[0-9]+(?:\.[0-9]+)? ?(?:acres|acre|ac)\b/g;
const regex_barrel = /\b[0-9]+(?:\.[0-9]+)? ?(?:barrels|barrel|bbl)\b/g;
const regex_gallons = /\b[0-9]+(?:\.[0-9]+)? ?gal(?:lon)?s?\b/g;

const ignoredNodeTypes = ['style'];

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

function shortNumeric(input){
  // return Math.round(input);
  // if input is an integer, return as is, else truncate.
  // We don't want a 12 to be modified to a 12.0
  var shortNum = (input === parseInt(input, 10)) ? input : input.toFixed(1);
  // we're still getting numbers like 3.0, probably due to rounding down
  // brutal solution, not proud of this:
  // since we need a string version of this anyway we can just type cast here and remove the .0
  return shortNum.toString().replace(/\.0$/, '')
  // apologies for this.
}

function fahrenheit2Celsius(input) {
    var f = parseFloat(cleanTemperature(input));
    var result = shortNumeric((f - 32) / 1.8);
    return shortNumeric(result) + "° C";
}

function inch2Centimeters(input) {
    var f = parseFloat(cleanInch(input));
    return shortNumeric(f * 2.54) + " cm";
}

function feet2Meters(input) {
    var f = parseFloat(cleanFeet(input));
    var result = f * 0.3048;
    return shortNumeric(result) + " m";
}

function yard2Meters(input) {
    var f = parseFloat(cleanYard(input));
    var result = f * 0.9144;
    return shortNumeric(result) + " m";
}

function miles2Km(input) {
    var f = parseFloat(cleanMiles(input));
    var result = f * 1.609344;
    return shortNumeric(result) + " km";
}

function mph2kmh(input) {
    var f = parseFloat(cleanMph(input));
    var result = f * 1.609344;
    return shortNumeric(result) + " km/h";
}

function knots2kmh(input) {
    var f = parseFloat(cleanKnots(input));
    var result = f * 1.852;
    return shortNumeric(result) + " km/h";
}

function acres2sqm(input) {
    var f = parseFloat(cleanAcres(input));
    var result = f * 4047;
    return shortNumeric(result) + " m²";
}

function barrel2litres(input) {
    var f = parseFloat(cleanBarrels(input));
    var result = shortNumeric(f * 158.987);
    return result == 1 ? result + " litre" : result + " litres";
}

function gallon2litres(input) {
    var f = parseFloat(cleanGallon(input));
    var result = shortNumeric(f * 3.785);
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

function updateNewNode(node){
    console.log("New node of type " + node.nodeType);
    console.log(node);
    rewrite(node);
}

function translate2european(text){
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

    return text;
}

module.exports = {translate2european};

