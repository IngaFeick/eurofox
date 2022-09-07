const {hello, translate2european} = require('./eurofox');

test("Hello", () => {
    expect(hello()).toBe("hello");
});