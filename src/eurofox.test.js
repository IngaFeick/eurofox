// const {translate2european} = require('./eurofox');

import { translate2european } from './eurofox';

function modify(input, output) {
	let actualResult = translate2european(input);
	let wantedResult = '<span title="' + input + '">' + output + '</span>';
	expect(actualResult).toBe(wantedResult);
}

function noChange(input) {
	expect(translate2european(input)).toBe(input);
}

function manual(input, output) {
	expect(translate2european(input)).toBe(output);
}

// Number detection:

test("translate larger numbers", () => {
    let input = "Ukrainian forces had retaken more than 1,100 square miles of territory.";
    let expected = "Ukrainian forces had retaken more than <span title=\"1,100 square miles\">2849 km²</span> of territory.";
    manual(input, expected);
});


// ------------------------------------------------------ FAHRENHEIT ---------------------

test("translate temperature", () => {
    modify('23°F', '-5° C');
});
test("translate temperature", () => {
    modify('23° F', '-5° C');
});
test("translate temperature", () => {
    modify('23°f', '-5° C');
});
test("translate temperature", () => {
    modify('23° F', '-5° C');
});
test("translate temperature", () => {
    modify('°23f', '-5° C');
});
test("translate temperature", () => {
    modify('23.3 F', '-4.8° C');
});
test("translate temperature", () => {
    modify('°23F', '-5° C');
});
test("translate temperature", () => {
    modify('23.3f', '-4.8° C');
});
test("translate temperature", () => {
    modify('212°F', '100° C');
});
test("translate temperature", () => {
    modify('80 °f', '26.7° C');
});
test("translate temperature", () => {
    modify('° 90 f', '32.2° C');
});
test("translate temperature", () => {
    modify('100 ° f', '37.8° C');
});
test("translate temperature", () => {
    modify('110 °F', '43.3° C');
});
test("translate inches", () => {
    noChange('There are 10 flies on the wall and this sentence must not match.');
});

// ------------------------------------------------------ INCHES ---------------------

test("translate inches", () => {
    modify('9in', '22.9 cm');
});
test("translate inches", () => {
    modify('1 inch', '2.5 cm');
});
test("translate inches", () => {
    modify('10 inches', '25.4 cm');
});
test("translate inches", () => {
    modify('0 inches', '0 cm');
});
test("translate inches", () => {
    modify('23in', '58.4 cm');
});
test("translate inches", () => {
    modify('89 inch', '226.1 cm');
});
test("translate inches", () => {
    manual('these are 23 inches and this is 99.9 inch while this ends with 12in.',
    	"these are <span title=\"23 inches\">58.4 cm</span> and this is <span title=\"99.9 inch\">253.7 cm</span> while this ends with <span title=\"12in\">30.5 cm</span>."
    	);
});
test("translate inches", () => {
    manual('39" or 93 "', '<span title="39\"">99.1 cm</span> or <span title="93 \"">236.2 cm</span>');
});
test("translate inches", () => {
    noChange('ipsum loret "7.9.0" release');
});
test("translate inches", () => {
    noChange('"100"');
});
test("translate inches", () => {
    noChange('23 in cannot be matched due to the ambiguosity of language.');
});
test("translate inches", () => {
    noChange('There are 200 people in the countryside and 500 in the city.');
});
test("translate inches", () => {
    noChange('I want to each 12 inchiladas');
});
test("translate inches", () => {
    noChange('I\'m going to turn 13 in November.');
});

// --------------------------------------------------------- FEET ---------------------

test("translate feet", () => {
    modify('0ft', '0 m');
});
test("translate feet", () => {
    modify('1ft', '0.3 m');
});
test("translate feet", () => {
    modify('1 ft', '0.3 m');
});
test("translate feet", () => {
    modify('1 foot', '0.3 m');
});
test("translate feet", () => {
    modify('2 feet', '0.6 m');
});
test("translate feet", () => {
    modify('2 feets', '0.6 m');
});
test("translate feet", () => {
    modify('20feet', '6.1 m');
});
test("translate feet", () => {
    modify('20.0feet', '6.1 m');
});
test("translate feet", () => {
    modify('20.9feet', '6.4 m');
});
test("translate feet", () => {
    modify('20 ft', '6.1 m');
});
test("translate feet", () => {
    modify('34ft', '10.4 m');
});
test("translate feet", () => {
    noChange('3 feetless caterpillars sit on a sunflower');
});

// TODO add tests for yard = /\b[0-9]+(?:\.[0-9]+)? ?(?:yd|yard|yards)\b/g;
// TODO add tests for miles = /\b[0-9]+(?:\.[0-9]+)? ?mi(?:le)?s?\b/g;
// TODO add tests for acres = /\b[0-9]+(?:\.[0-9]+)? ?(?:acres|acre|ac)\b/g;

// ------------------------------------------------------ SQUARE MILES ---------------------

test("translate square miles", () => {
    modify('1 sq mi', '2.6 km²');
});

test("translate square miles", () => {
    modify('2 square miles', '5.2 km²');
});

test("translate square miles", () => {
    modify('0 square mile', '0 km²');
});

// ------------------------------------------------------ POUND ---------------------

test("translate pounds", () => {
    modify('1 pound', '0.5 kg');
});

test("translate pounds", () => {
    modify('2 pounds', '0.9 kg');
});

test("translate pounds", () => {
    modify('17 lb', '7.7 kg');
});

// ------------------------------------------------------ STONES ---------------------

test("translate stones", () => {
    modify('1 stone', '6.4 kg');
});

test("translate stones", () => {
    modify('1 st', '6.4 kg');
});

test("translate stones", () => {
    modify('2 stones', '12.7 kg');
});

test("translate stones", () => {
    noChange('I can’t believe that we went through something like this in the 21st century');
});

// ------------------------------------------------------ GALLONS ---------------------

test("translate gallons", () => {
    modify('10 gallons', '37.9 litres');
});
test("translate gallons", () => {
    modify('1 gallon', '3.8 litres');
});
test("translate gallons", () => {
    modify('200gallons', '757 litres');
});
test("translate gallons", () => {
    modify('3gal', '11.4 litres');
});
test("translate gallons", () => {
    modify('2 gal', '7.6 litres');
});
test("translate gallons", () => {
    modify('0.26417205124156 gallon', '1 litre');
});
test("translate gallons", () => {
    manual('Finally 0.2642 gallon which is exactly one litre.',
    	'Finally <span title=\"0.2642 gallon\">1 litre</span> which is exactly one litre.');
});

// ------------------------------------------------------ Barrels ---------------------

test("translate barrels", () => {
    modify('90 barrels', '10731.6 litres');
});
test("translate barrels", () => {
    modify('1 barrel', '119.2 litres');
});
test("translate barrels", () => {
    modify('1 bbl', '119.2 litres');
});
test("translate barrels", () => {
    modify('0bbl', '0 litres');
});
test("translate barrels", () => {
    modify('40bbl', '4769.6 litres');
});
test("translate barrels", () => {
    noChange('barrel of a gun');
});

// ------------------------------------------------------ KNOTS ---------------------

test("translate knots", () => {
    modify('10 knots', '18.5 km/h');
});
test("translate knots", () => {
    modify('20knots', '37 km/h');
});
test("translate knots", () => {
    modify('30 kn', '55.6 km/h');
});
test("translate knots", () => {
    modify('1 knot', '1.9 km/h');
});
test("translate knots", () => {
    modify('40kn', '74.1 km/h');
});
test("translate knots", () => {
    modify('0knot', '0 km/h');
});
test("translate knots", () => {
    modify('13.3 knots', '24.6 km/h');
});
test("translate knots", () => {
    noChange('I have a knot in my cable.');
});

// ------------------------------------------------------ MPH ---------------------

test("translate mph", () => {
    modify('0 mph', '0 km/h');
});
test("translate mph", () => {
    modify('10 mph', '16.1 km/h');
});
test("translate mph", () => {
    modify('1 mph', '1.6 km/h');
});
test("translate mph", () => {
    modify('3mph', '4.8 km/h');
});
test("translate mph", () => {
    modify('1 mile per hour', '1.6 km/h');
});
test("translate mph", () => {
    modify('3miles per hour', '4.8 km/h');
});

// ------------------------------------------------------ Special cases ---------------------

test("translate2european", () => {
	var input = `The following span contains nothing but the word thousand, in numbers and in quotation marks:<br>
<span class="token string">"1000"</span><br>
The 1000 in quotation marks must not be replaced. <br>`;
    noChange(input);
});

test("translate2european", () => {
	var input = `<p>
          <strong>Negative lookbehind assertion: </strong>Matches "x" only if
          "x" is not preceded by "y". For example,
          <code>/(?&lt;!-)\d+/</code> matches a number only if it is not
          preceded by a minus sign. <code>/(?&lt;!-)\d+/.exec('3')</code>
          matches "3". <code>/(?&lt;!-)\d+/.exec('-3')</code> match is not
          found because the number is preceded by the minus sign.
        </p>`;
    noChange(input);
});

test("translate2european", () => {
	var input = `With a population of around 131,136 (and 233,034 in the Capital Region), it is the centre of Iceland's cultural, economic, and governmental activity`;
    noChange(input);
});

// TODO add the first two cases from the demo page from 2nd h1 (number ranges and 1 1/2)

