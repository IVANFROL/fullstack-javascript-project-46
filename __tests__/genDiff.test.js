import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import genDiff from "../index.js";
import buildDiff from "../src/buildDiff.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  join(__dirname, "..", "__fixtures__", filename);
const readFile = (filepath) => readFileSync(filepath, "utf-8");

describe("genDiff nested", () => {
  test("should compare nested JSON files correctly (stylish)", () => {
    const filepath1 = getFixturePath("file1.json");
    const filepath2 = getFixturePath("file2.json");
    const expected = readFile(getFixturePath("expected_nested.txt")).trim();
    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expected);
  });

  test("should compare nested YAML files correctly (stylish)", () => {
    const filepath1 = getFixturePath("file1.yml");
    const filepath2 = getFixturePath("file2.yml");
    const expected = readFile(getFixturePath("expected_nested.txt")).trim();
    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expected);
  });

  test("should compare nested JSON files correctly (plain)", () => {
    const filepath1 = getFixturePath("file1.json");
    const filepath2 = getFixturePath("file2.json");
    const expected = readFile(getFixturePath("expected_plain.txt")).trim();
    const result = genDiff(filepath1, filepath2, "plain");
    expect(result).toBe(expected);
  });

  test("should compare nested JSON files correctly (json)", () => {
    const filepath1 = getFixturePath("file1.json");
    const filepath2 = getFixturePath("file2.json");
    const data1 = JSON.parse(readFile(filepath1));
    const data2 = JSON.parse(readFile(filepath2));
    const expected = JSON.stringify(buildDiff(data1, data2), null, 2);
    const result = genDiff(filepath1, filepath2, "json");
    expect(result).toBe(expected);
  });
});
