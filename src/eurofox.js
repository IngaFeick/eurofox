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
    return parseFloat(input);
  }

  convert(input){
    return input * this.conversionFactor;
  }

  display(input){
    return input + this.targetUnitDisplay;
  }

  toTarget(input) {
    let value = this.clean(input);
    let converted = shortNumeric(this.convert(value));
    return this.display(converted);
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
  new UnitConversion("Inch", /(?<!")\b\d+\s?"|\d+(\.\d+)?((in|\s?inch(es)?)\b)/g, ['inch','in','"'],2.54 , " cm"),
  // TODO testen: const regex_inch = /(?<!")\s+\d+\s?"|\d+(\.\d+)?((in|\s?inch(es)?)\b)/g;

  new UnitConversion("Feet", /\b[0-9]+(?:\.[0-9]+)? ?(?:ft|feet|foot|feets)\b/g, ['feets','feet','foot','ft'], 0.3048, " m"),
  // I know that feets is not a word, but you know the internet.
  new UnitConversion("Miles", /[0-9]+(\.[0-9]+)? ?°? ?mi(le)?s?\b(?! per hour)/g, ['miles','mile','mi'], 1.609344, " km"),
  new UnitConversion("Stones", /\b[0-9]+(?:\.[0-9]+)? (?:stone(s)?|st)\b/g, ['stones','stone','st'], 6.35029, " kg"),
  new UnitConversion("Yard", /\b[0-9]+(?:\.[0-9]+)? ?(?:yd|yard|yards)\b/g, ['yards','yard','yd'], 0.9144, " m"),
  new UnitConversion("Mph", /\b[0-9]+(?:\.[0-9]+)? ?(?:mph|mile(?:s)? per hour)\b/g, ['miles per hour','mile per hour','mph'], 1.609344, " km/h"),
  new UnitConversion("Knots", /\b[0-9]+(?:\.[0-9]+)? ?(?:knots|knot|kn)\b/g, ['knots','knot','kn'], 1.852, " km/h"),
  new UnitConversion("Acres", /\b[0-9]+(?:\.[0-9]+)? ?(?:acres|acre|ac)\b/g, ['acres','acre','ac'], 4047, " m²"),
  new LiquidsConversion("Barrels", /\b[0-9]+(?:\.[0-9]+)? ?(?:barrels|barrel|bbl)\b/g, ['barrels','barrel','bbl'], 119.240471196, ""),
  new LiquidsConversion("Gallon", /\b[0-9]+(?:\.[0-9]+)? ?gal(?:lon)?s?\b/g, ['gallons','gallon','gal'] ,3.785, ""),
  new TemperatureConversion("Temperature", /(?:° ?)?[0-9]+(?:\.[0-9]+)? ?°? ?[fF]\b/g, [],0 , "° C"),
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
  for (const conversion of supportedConversions) {
    for (const match of text.matchAll(conversion.regex)){
      let replacementValue = conversion.toTarget(match[0]);
      let replacementHtml = makeNewText(match[0], replacementValue);
      text = text.replaceAll(match[0], replacementHtml);
    }
  }

  return text;
}

export { translate2european };

