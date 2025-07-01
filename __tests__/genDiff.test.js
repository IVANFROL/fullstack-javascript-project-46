import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import genDiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), "utf-8");

describe("genDiff", () => {
  test("should compare nested JSON files", () => {
    const file1 = getFixturePath("file1.json");
    const file2 = getFixturePath("file2.json");
    const expected = readFile("expected.txt").trim();
    const result = genDiff(file1, file2);
    expect(result).toEqual(expected);
  });

  test("should compare nested YAML files", () => {
    const file1 = getFixturePath("file1.yml");
    const file2 = getFixturePath("file2.yml");
    const expected = readFile("expected-yaml.txt").trim();
    const result = genDiff(file1, file2);
    expect(result).toEqual(expected);
  });

  test("should format diff in plain style", () => {
    const file1 = getFixturePath("file1.json");
    const file2 = getFixturePath("file2.json");
    const expected = readFile("expected-plain.txt").trim();
    const result = genDiff(file1, file2, "plain");
    expect(result).toEqual(expected);
  });

  test("should format diff in json style", () => {
    const file1 = getFixturePath("file1.json");
    const file2 = getFixturePath("file2.json");
    const result = genDiff(file1, file2, "json");
    expect(() => JSON.parse(result)).not.toThrow();
    expect(result).toMatchSnapshot();
  });
});
