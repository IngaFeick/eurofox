# Eurofox 🇪🇺 🔥 🦊

Firefox plugin to automatically translate ° Fahrenheit and size measurements into european units.
To see the original value, hover over the measurement.
The numbers are rounded for easier reading, so don't expect exact values.
The plugin will not work for values which are spelled out as words instead of numbers (such as `one mile` instead of `1 mile`).

The source is heavily inspired by the [tc](https://github.com/spb/tc) firefox extension.

To check if the installation works in your browser, please navigate to the [test page](testpage/test.html).

## Supported units:

* Temperature (Fahrenheit to Celsius)
* Sizes (inch, foot, yard, miles)
* Areas (acres)
* Speeds (mph, knots)

## TODOs

* Make logo
* BUG: javascript exclusion test failed
* BUG: temperature test with yellow css is broken
* convert barrels
* convert units for cooking
* remove console output
* maybe replace jquery with pure js
* publish
* test if this works on pages where content is added after initial dom is created

## Notes for development

* Regexes:
** temperature in [ecma](https://regex101.com/r/Wrpp4x/2) and the original in [pcre](https://regex101.com/r/Ak5Joj/1)
** inches https://regex101.com/r/Cjhgl4/5
** feet https://regex101.com/r/xVnj9A/3
** miles https://regex101.com/r/qAti0n/2
** mph https://regex101.com/r/8AvYcc/1
* `npm install regex-translator; npx regex-translator -o -T ecma -F pcre -R "(° ?)?\d+(\.\d+)?+°?+ ?[fF]"` for converting regexes from pcre 🧠 => ecma 💪
* more units up for convertion at
** [wiki/United_States_customary_units](https://simple.wikipedia.org/wiki/United_States_customary_units)
** [wiki/Category:Imperial_units](https://en.wikipedia.org/wiki/Category:Imperial_units)
