const {hello, translate2european} = require('./eurofox');

test("Hello", () => {
    expect(hello()).toBe("hello");
});



test("translate2european", () => {
    expect(translate2european("9 inch nails")).toBe('<span title="9 inch">23 cm</span> nails');
});