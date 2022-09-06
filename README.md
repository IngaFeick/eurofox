# [WIP| eurofox

Firefox plugin to automatically translate ° Fahrenheit and size measurements into european units.

The source is very heavily inspired by the [tc](https://github.com/spb/tc) firefox extension.

To check if the installation works in your browser, navigate to the [test page](testpage/test.html).

## TODOs

* convert mph and miles
* convert inch, foot, yard, mile
* barrels
* units for cooking
* remove console output
* support for floats
* maybe replace jquery with pure js
* publish
* test if this works on pages where content is added after initial dom is created
* more units up for convertion at
** [wiki/United_States_customary_units](https://simple.wikipedia.org/wiki/United_States_customary_units)
** [wiki/Category:Imperial_units](https://en.wikipedia.org/wiki/Category:Imperial_units)

## Notes for development

* Regex for the temperature in [ecma](https://regex101.com/r/Wrpp4x/1) and the original in [pcre](https://regex101.com/r/Ak5Joj/1)
* `npm install regex-translator; npx regex-translator -o -T ecma -F pcre -R "(° ?)?\d+(\.\d+)?+°?+ ?[fF]"` for converting regexes from pcre 🧠 => ecma 💪
