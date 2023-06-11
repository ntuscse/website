import { getDisplayDate } from "@/lib/helpers/getDisplayDate";

describe("Test helper functions", () => {
  test("expect getDisplayDate to return correctly", () => {
    getDisplayDateTestCases.forEach((testCase) => {
      expect(getDisplayDate(testCase.input)).toBe(testCase.expected);
    });
  });
});

interface TestCase {
  input: any;
  expected: any;
}

const getDisplayDateTestCases: TestCase[] = [
  {
    input: new Date("2022-03-25"),
    expected: "March 25, 2022",
  },
  {
    input: new Date("2023-01-01"),
    expected: "January 01, 2023",
  },
];
