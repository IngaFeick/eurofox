"use strict";

const regex_temperature = /(?:° ?)?[0-9]+(?:\.[0-9]+)? ?°? ?[fF]\b/g;
const regex_inch = /(?<!")\b\d+\s?"|\d+(\.\d+)?((in|\s?inch(es)?)\b)/g;
const regex_feet = /\b[0-9]+(?:\.[0-9]+)? ?(?:ft|feet|foot|feets)\b/g;
const regex_yard = /\b[0-9]+(?:\.[0-9]+)? ?(?:yd|yard|yards)\b/g;
const regex_miles = /[0-9]+(\.[0-9]+)? ?°? ?mi(le)?s?\b(?! per hour)/g;
const regex_mph = /\b[0-9]+(?:\.[0-9]+)? ?(?:mph|mile(?:s)? per hour)\b/g;
const regex_knots = /\b[0-9]+(?:\.[0-9]+)? ?(?:knots|knot|kn)\b/g;
const regex_acres = /\b[0-9]+(?:\.[0-9]+)? ?(?:acres|acre|ac)\b/g;
const regex_barrel = /\b[0-9]+(?:\.[0-9]+)? ?(?:barrels|barrel|bbl)\b/g;
const regex_gallons = /\b[0-9]+(?:\.[0-9]+)? ?gal(?:lon)?s?\b/g;

const ignoredNodeTypes = ['style'];

function cleanTemperature(input){
  return parseFloat(input.replace(/[Ff]$/, '').replace('°','').replace(' ',''));
}

function cleanInput(input, removables){
    removables.forEach((rep) => { input.replace(rep, '')});
    // input.replace(' ','');
    return parseFloat(input);
}


// TODO remove the redundancy here:

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

function cleanMph(input){ // TODO broken
  return cleanInput(input, ['miles per hour','mile per hour','mph']);
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
  return shortNumeric((cleanTemperature(input) - 32) / 1.8) + "° C";
}

// TODO remove the redundancy

function inch2Centimeters(input) {
  return shortNumeric(cleanInch(input) * 2.54) + " cm";
}

function feet2Meters(input) {
  return shortNumeric(cleanFeet(input) * 0.3048) + " m";
}

function yard2Meters(input) {
  return shortNumeric(cleanYard(input) * 0.9144) + " m";
}

function miles2Km(input) {
  return shortNumeric(cleanMiles(input) * 1.609344) + " km";
}

function mph2kmh(input) {
  return shortNumeric(cleanMph(input) * 1.609344) + " km/h";
}

function knots2kmh(input) {
  return shortNumeric(cleanKnots(input) * 1.852) + " km/h";
}

function acres2sqm(input) {
  return shortNumeric(cleanAcres(input) * 4047) + " m²";
}

function barrel2litres(input) {
  var result = shortNumeric(cleanBarrels(input) * 119.240471196);
  return result == 1 ? result + " litre" : result + " litres";
}

function gallon2litres(input) {
  var result = shortNumeric(cleanGallon(input) * 3.785);
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
  for (const match of text.matchAll(regex_mph)){
    console.log("Match for regex_mph:"); console.log(match);
    console.log("Replacement raw for " + match[0] + " is " + mph2kmh(match[0]));
    console.log("Replacement final is " + makeNewText(match[0], mph2kmh(match[0])));
    text = text.replaceAll(match[0], makeNewText(match[0], mph2kmh(match[0])));
  }

  for (const match of text.matchAll(regex_knots)){
    text = text.replaceAll(match[0], makeNewText(match[0], knots2kmh(match[0])));
  }

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

// export { translate2european };
//module.exports = {translate2european,cleanMph};

function rewrite(textNode) {
    console.log("Rewrite:");
    console.log(textNode);

    /* TODO this doesn't work when the node is passed from the Mutation Observer:
    if (textNode.parent() && textNode.parent()[0])
    {
        let nodeParentType = textNode.parent()[0].localName;
        if(ignoredNodeTypes.includes(nodeParentType) )
        {
            return;
        }
    }*/

    let text = translate2european(textNode.text());
    textNode.replaceWith(text);
}

/*

$("body").find("*").contents().filter(nodeFilter).each(function() {
    let node = $(this);
    rewrite(node);
  });


const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type == "childList") {
      // console.log("Mutation:");
      // console.log(mutation);
      if (mutation.addedNodes) {
        console.log("Added nodes:");
        console.log(mutation.addedNodes);
       // TODO filter on text nodes
        mutation.addedNodes.forEach(node => updateNewNode(node));

      }
    }
  }
};
const targetNode = document.body;
const observerConfig = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(mutationCallback);
observer.observe(targetNode, observerConfig);
*/