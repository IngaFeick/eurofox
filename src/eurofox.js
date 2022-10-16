"use strict";

class UnitConversion {
  constructor(originalUnit, regex, keywords, conversionFactor, targetUnitDisplay) {
    this.originalUnit = originalUnit;
    this.regex = regex;
    this.keywords = keywords;
    this.conversionFactor = conversionFactor;
    this.targetUnitDisplay = targetUnitDisplay;
  }

  clean(input) {
    this.keywords.forEach((rep) => { input.replace(rep, '')});
    input = input.replace(',',''); // remove separators for thousands
    return parseFloat(input);
  }

  convert(input){
    return input * this.conversionFactor;
  }

  display(input){
    return input + this.targetUnitDisplay;
  }

  toTarget(input) {
    let testActive = false;
    if (testActive) {console.log("input: " + input);}
    let value = this.clean(input);
    if (testActive) {console.log("clean: " + value);}
    let converted = shortNumeric(this.convert(value));
    if (testActive) {console.log("converted: " + converted);}
    let result = this.display(converted);
    if (testActive) {console.log("result: " + result);}
    return result;
  }
}

class TemperatureConversion extends UnitConversion {

  clean(input) {
    return parseFloat(input.replace(/[Ff]$/, '').replace('°','').replace(' ',''));
  }

  convert(input) {
    return (input - 32) / 1.8;
  }
}

class LiquidsConversion extends UnitConversion {

  display(input) {
    return input == 1 ? input + " litre" : input + " litres";
  }
}

let supportedConversions = [
  // TODO add the new regex for numbers to the Inch regex: https://regex101.com/r/YaswXB/1
  new UnitConversion("Inch", /(?<!")\s+\d+\s?"|\d+(\.\d+)?((in|\s?inch(es)?)\b)/g, ['inch','in','"'],2.54 , " cm"),
  // TODO testen: const regex_inch = /(?<!")\s+\d+\s?"|\d+(\.\d+)?((in|\s?inch(es)?)\b)/g;

  new UnitConversion("Feet", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:ft|feet|foot|feets)\b/g, ['feets','feet','foot','ft'], 0.3048, " m"),
  // I know that feets is not a word, but you know the internet.
  new UnitConversion("Miles", /\b\d{1,3}(,\d{3})*(\.\d+)? ?°? ?mi(le)?s?\b(?! per hour)/g, ['miles','mile','mi'], 1.609344, " km"),
  new UnitConversion("Stones", /\b\d{1,3}(,\d{3})*(\.\d+)? (?:stone(s)?|st)\b/g, ['stones','stone','st'], 6.35029, " kg"),
  new UnitConversion("Yard", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:yd|yard|yards)\b/g, ['yards','yard','yd'], 0.9144, " m"),
  new UnitConversion("Mph", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:mph|mile(?:s)? per hour)\b/g, ['miles per hour','mile per hour','mph'], 1.609344, " km/h"),
  new UnitConversion("Knots", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:knots|knot|kn)\b/g, ['knots','knot','kn'], 1.852, " km/h"),
  new UnitConversion("Acres", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:acres|acre|ac)\b/g, ['acres','acre','ac'], 4047, " m²"),
  new UnitConversion("Square miles", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:square miles|square mile|sq mi)\b/g, ['square miles','square mile','sq mi'], 2.589988, " km²"),
  new UnitConversion("Pound", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:pounds|pound|lb)\b/g, ['pounds','pound','lb'], 0.45359237, " kg"),
  new LiquidsConversion("Barrels", /\b\d{1,3}(,\d{3})*(\.\d+)? ?(?:barrels|barrel|bbl)\b/g, ['barrels','barrel','bbl'], 119.240471196, ""),
  new LiquidsConversion("Gallon", /\b\d{1,3}(,\d{3})*(\.\d+)? ?gal(?:lon)?s?\b/g, ['gallons','gallon','gal'] ,3.785, ""),
  new TemperatureConversion("Temperature", /(?:° ?)?\d{1,3}(,\d{3})*(\.\d+)? ?°? ?[fF]\b/g, [],0 , "° C"),
];

const ignoredNodeTypes = ['style'];

function shortNumeric(input){
  // if input is an integer, return as is, else truncate.
  // We don't want a 12 to be modified to a 12.0
  var shortNum = (input === parseInt(input, 10)) ? input : input.toFixed(1);
  // we're still getting numbers like 3.0, probably due to rounding down
  // brutal solution, not proud of this:
  // since we need a string version of this anyway we can just type cast here and remove the .0
  return shortNum.toString().replace(/\.0$/, '')
  // apologies for this.
}

function makeNewText(original, replacement){
  return '<span title="' + original + '">' + replacement + '</span>';
}

function translate2european(text){
  let testActive = false;
  if (testActive) {console.log("test: " + text);}
  for (const conversion of supportedConversions) {
    for (const match of text.matchAll(conversion.regex)){
      if (testActive) {console.log("match: " + match[0]);}
      let replacementValue = conversion.toTarget(match[0]);
      if (testActive) {console.log("replacementValue: " + replacementValue);}
      let replacementHtml = makeNewText(match[0], replacementValue);
      text = text.replaceAll(match[0], replacementHtml);
    }
  }
  return text;
}

export { translate2european };
