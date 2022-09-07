const {translate2european} = require('./eurofox');

function modify(input, output) {
	actualResult = translate2european(input);
	wantedResult = '<span title="' + input + '">' + output + '</span>';
	expect(actualResult).toBe(wantedResult);
}

function leave(input, output) {
	actualResult = translate2european(input);
	expect(actualResult).toBe(output);
}

// TODO temperatures

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
    leave('these are 23 inches and this is 99.9 inch while this ends with 12in.',
    	"these are <span title=\"23 inches\">58.4 cm</span> and this is <span title=\"99.9 inch\">253.7 cm</span> while this ends with <span title=\"12in\">30.5 cm</span>."
    	);
});
test("translate2european", () => {
    leave('39" or 93 "', '<span title="39\"">99.1 cm</span> or <span title="93 \"">236.2 cm</span>');
});
test("translate2european", () => {
    leave('"100"', '"100"');
});
test("translate2european", () => {
    leave('23 in cannot be matched due to the ambiguosity of language.', '23 in cannot be matched due to the ambiguosity of language.');
});
test("translate2european", () => {
    leave('There are 200 people in the countryside and 500 in the city.', 'There are 200 people in the countryside and 500 in the city.');
});
test("translate2european", () => {
    leave('I want to each 12 inchiladas', 'I want to each 12 inchiladas');
});
test("translate2european", () => {
    leave('I\'m going to turn 13 in November.', 'I\'m going to turn 13 in November.');
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
    leave('3 feetless caterpillars sit on a sunflower', '3 feetless caterpillars sit on a sunflower');
});




/*

test("translate2european", () => {
    modify('', '');
});
*/

