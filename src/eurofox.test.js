const {translate2european} = require('./eurofox');

function modify(input, output) {
	actualResult = translate2european(input);
	wantedResult = '<span title="' + input + '">' + output + '</span>';
	expect(actualResult).toBe(wantedResult);
}

function noChange(input) {
	expect(translate2european(input)).toBe(input);
}

function manual(input, output) {
	expect(translate2european(input)).toBe(output);
}

// TODO add tests for temperatures

// Inches: ------------------------------------------------------ INCHES ---------------------
test("translate2european", () => {
    modify('9in', '22.9 cm');
});
test("translate2european", () => {
    modify('1 inch', '2.5 cm');
});
test("translate2european", () => {
    modify('10 inches', '25.4 cm');
});
test("translate2european", () => {
    modify('0 inches', '0 cm');
});
test("translate2european", () => {
    modify('23in', '58.4 cm');
});
test("translate2european", () => {
    modify('89 inch', '226.1 cm');
});
test("translate2european", () => {
    manual('these are 23 inches and this is 99.9 inch while this ends with 12in.',
    	"these are <span title=\"23 inches\">58.4 cm</span> and this is <span title=\"99.9 inch\">253.7 cm</span> while this ends with <span title=\"12in\">30.5 cm</span>."
    	);
});
test("translate2european", () => {
    manual('39" or 93 "', '<span title="39\"">99.1 cm</span> or <span title="93 \"">236.2 cm</span>');
});
test("translate2european", () => {
    noChange('"100"');
});
test("translate2european", () => {
    noChange('23 in cannot be matched due to the ambiguosity of language.');
});
test("translate2european", () => {
    noChange('There are 200 people in the countryside and 500 in the city.');
});
test("translate2european", () => {
    noChange('I want to each 12 inchiladas');
});
test("translate2european", () => {
    noChange('I\'m going to turn 13 in November.');
});

// Feet: ------------------------------------------------------ FEET ---------------------
test("translate2european", () => {
    modify('0ft', '0 m');
});
test("translate2european", () => {
    modify('1ft', '0.3 m');
});
test("translate2european", () => {
    modify('1 ft', '0.3 m');
});
test("translate2european", () => {
    modify('1 foot', '0.3 m');
});
test("translate2european", () => {
    modify('2 feet', '0.6 m');
});
test("translate2european", () => {
    modify('2 feets', '0.6 m');
});
test("translate2european", () => {
    modify('20feet', '6.1 m');
});
test("translate2european", () => {
    modify('20.0feet', '6.1 m');
});
test("translate2european", () => {
    modify('20.9feet', '6.4 m');
});
test("translate2european", () => {
    modify('20 ft', '6.1 m');
});
test("translate2european", () => {
    modify('34ft', '10.4 m');
});
test("translate2european", () => {
    noChange('3 feetless caterpillars sit on a sunflower');
});

// TODO add tests for yard = /\b[0-9]+(?:\.[0-9]+)? ?(?:yd|yard|yards)\b/g;
// TODO add tests for miles = /\b[0-9]+(?:\.[0-9]+)? ?mi(?:le)?s?\b/g;
// TODO add tests for mph = /\b[0-9]+(?:\.[0-9]+)? ?(?:mph|miles per hour)\b/g;
// TODO add tests for knots = /\b[0-9]+(?:\.[0-9]+)? ?(?:knots|knot|kn)\b/g;
// TODO add tests for acres = /\b[0-9]+(?:\.[0-9]+)? ?(?:acres|acre|ac)\b/g;

test("translate2european", () => {
    modify('10 gallons', '37.9 litres');
});
test("translate2european", () => {
    modify('1 gallon', '3.8 litres');
});
test("translate2european", () => {
    modify('200gallons', '757 litres');
});
test("translate2european", () => {
    modify('3gal', '11.4 litres');
});
test("translate2european", () => {
    modify('2 gal', '7.6 litres');
});
test("translate2european", () => {
    modify('0.26417205124156 gallon', '1 litre');
});
test("translate2european", () => {
    manual('Finally 0.2642 gallon which is exactly one litre.', 'Finally <span title=\"0.2642 gallon\">1 litre</span> which is exactly one litre.');
});

test("translate2european", () => {
    modify('90 barrels', '10731.6 litres');
});
test("translate2european", () => {
    modify('1 barrel', '119.2 litres');
});
test("translate2european", () => {
    modify('1 bbl', '119.2 litres');
});
test("translate2european", () => {
    modify('0bbl', '0 litres');
});

test("translate2european", () => {
    modify('40bbl', '4769.6 litres');
});

// TODO add remaining tests from 2nd h1
/*

test("translate2european", () => {
    modify('', '');
});

test("translate2european", () => {
    noChange('');
});

*/

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

