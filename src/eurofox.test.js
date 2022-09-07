import { hello } from "eurofox";

test("Hello", () => {
    expect(hello()).toBe("hello");
});