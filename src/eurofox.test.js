const {translate2european} = require('./eurofox');

function wrappy(input, output, mustNotBeModified = false) {
	actualResult = translate2european(input);
	wantedResult = mustNotBeModified ? input : '<span title="' + input + '">' + output + '</span>';
	expect(actualResult).toBe(wantedResult);
}

function nowrappy(input, output) {
	actualResult = translate2european(input);
	expect(actualResult).toBe(output);
}

// Inches:
test("translate2european", () => {
    wrappy('9in', '22.9 cm');
});
test("translate2european", () => {
    wrappy('1 inch', '2.5 cm');
});
test("translate2european", () => {
    wrappy('10 inches', '25.4 cm');
});
test("translate2european", () => {
    wrappy('0 inches', '0 cm');
});
test("translate2european", () => {
    wrappy('23in', '58.4 cm');
});
test("translate2european", () => {
    wrappy('89 inch', '226.1 cm');
});
test("translate2european", () => {
    nowrappy('these are 23 inches and this is 99.9 inch while this ends with 12in.',
    	"these are <span title=\"23 inches\">58.4 cm</span> and this is <span title=\"99.9 inch\">253.7 cm</span> while this ends with <span title=\"12in\">30.5 cm</span>."
    	);
});
test("translate2european", () => {
    nowrappy('39" or 93 "', '<span title="39\"">99.1 cm</span> or <span title="93 \"">236.2 cm</span>');
});
test("translate2european", () => {
    wrappy('"100"', '"100"', true);
});
test("translate2european", () => {
    wrappy('23 in cannot be matched due to the ambiguosity of language.', '23 in cannot be matched due to the ambiguosity of language.', true);
});
test("translate2european", () => {
    wrappy('There are 200 people in the countryside and 500 in the city.', 'There are 200 people in the countryside and 500 in the city.', true);
});
test("translate2european", () => {
    wrappy('I want to each 12 inchiladas', 'I want to each 12 inchiladas', true);
});
test("translate2european", () => {
    wrappy('I\'m going to turn 13 in November.', 'I\'m going to turn 13 in November.', true);
});



/*
test("translate2european", () => {
    wrappy('', '');
});
test("translate2european", () => {
    wrappy('', '');
});
*/

