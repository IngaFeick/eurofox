# [WIP| eurofox

Work in progress - this ain't working yet, folks.

Firefox plugin to automatically translate ° Fahrenheit and size measurements into european units.

The source is very heavily inspired by the [tc](https://github.com/spb/tc) firefox extension.

To check if the installation works in your browser, navigate to the [test page](testpage/test.html).

## TODOs

* convert mph
* convert inch, feet, barrels
* exclude css / style nodes
* exclude script nodes
* remove console output

## Notes for development

* Regex for the temperature in [ecma](https://regex101.com/r/Wrpp4x/1) and the original in [pcre](https://regex101.com/r/Ak5Joj/1)
* `npm install regex-translator; npx regex-translator -o -T ecma -F pcre -R "(° ?)?\d+(\.\d+)?+°?+ ?[fF]"` for converting regexes from pcre 🧠 => ecma 💪