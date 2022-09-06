# Eurofox 🇪🇺 🔥 🦊

Firefox plugin to automatically translate ° Fahrenheit and size measurements into european units.
To see the original value, hover over the measurement.
The numbers are rounded for easier reading, so don't expect exact values.
The plugin will not work for values which are spelled out as words instead of numbers (such as `one mile` instead of `1 mile`).

The source is inspired by the [tc](https://github.com/spb/tc) firefox extension.

To check if the installation works in your browser, please navigate to the [test page](testpage/test.html).

## Supported units:

* Temperature (Fahrenheit to Celsius)
* Sizes (inch, foot, yard, miles)
* Areas (acres)
* Speeds (mph, knots)
* Liquids (barrel, gallon)

## TODOs

* BUG: javascript exclusion test failed
* BUG: fractions like `1/2 in` are incorrectly converted to `1/5 cm`; TODO translate some most common fractions into decimal syntax.
* BUG: cases like `1 1/2 in. x 5 1/2 in` where there is whitespace between the mantissa and the decimal point (or lack thereof) are not recognized yet. As a consequence the span titles are messed up: `<span title="<span title=" 2="" in"="">5 cm</span>` (test case: https://thediyplan.com/symbol-of-feet-and-inches/ search for "For example, a 2 x 6 is actually")
* convert units for cooking (pint, cup, quart, various spoons and ounces)
* remove console output
* maybe replace jquery with pure js
* write unit tests
* make logo
* make ESLint more strict
* publish
* test if this works on pages where content is added after initial dom is created

## Notes for development

* Regexes:
    - temperature in [ecma](https://regex101.com/r/Wrpp4x/2) and the original in [pcre](https://regex101.com/r/Ak5Joj/1)
    - inches https://regex101.com/r/Cjhgl4/5
    - feet https://regex101.com/r/xVnj9A/3
    - miles https://regex101.com/r/qAti0n/2
    - mph https://regex101.com/r/8AvYcc/1
* for converting regexes from pcre 🧠 => ecma:
	`npm install regex-translator; npx regex-translator -o -T ecma -F pcre -R "(° ?)?\d+(\.\d+)?+°?+ ?[fF]"`
* more units up for convertion at
    - [wiki/United_States_customary_units](https://simple.wikipedia.org/wiki/United_States_customary_units)
    - [wiki/Category:Imperial_units](https://en.wikipedia.org/wiki/Category:Imperial_units)

## Fun facts

* I'm not a frontend dev, I actually don't know what I'm doing. Apologies.

