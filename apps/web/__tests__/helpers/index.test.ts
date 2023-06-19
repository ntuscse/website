import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import { removeTextImgTag } from "@/lib/helpers/removeTextImgTag";

describe("Test helper functions", () => {
  test("expect getDisplayDate to return correctly", () => {
    getDisplayDateTestCases.forEach((testCase) => {
      expect(getDisplayDate(testCase.input)).toBe(testCase.expected);
    });
  });

  test("expect removeTextImgTag to return correctly", () => {
    removeTextImgTagTestCases.forEach(testCase => {
      expect(removeTextImgTag(testCase.input)).toBe(testCase.expected)
    })
  })
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

const removeTextImgTagTestCases: TestCase[] = [
  {
    input: 'SCSE <img class="testClass" src="test.com" /> test',
    expected: "SCSE <> test",
  },
  {
    input: '<img class="testClass"/>',
    expected: '<>'
  }
]
