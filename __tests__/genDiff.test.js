import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  join(__dirname, "..", "__fixtures__", filename);
const readFile = (filepath) => readFileSync(filepath, "utf-8");

describe("genDiff", () => {
  test("should compare flat JSON files correctly", () => {
    const filepath1 = getFixturePath("file1.json");
    const filepath2 = getFixturePath("file2.json");
    const expected = readFile(getFixturePath("expected.txt")).trim();

    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expected);
  });

  test("should handle identical files", () => {
    const filepath1 = getFixturePath("file1.json");
    const filepath2 = getFixturePath("file1.json");

    const result = genDiff(filepath1, filepath2);
    expect(result).toContain("host: hexlet.io");
    expect(result).toContain("timeout: 50");
    expect(result).toContain("proxy: 123.234.53.22");
    expect(result).toContain("follow: false");
    expect(result).not.toContain("+");
    expect(result).not.toContain("-");
  });

  test("should handle empty objects", async () => {
    const emptyFile1 = getFixturePath("empty1.json");
    const emptyFile2 = getFixturePath("empty2.json");

    // Create empty JSON files for testing
    const fs = await import("fs");
    fs.writeFileSync(emptyFile1, "{}");
    fs.writeFileSync(emptyFile2, "{}");

    const result = genDiff(emptyFile1, emptyFile2);
    expect(result).toBe("{\n}");

    // Clean up
    fs.unlinkSync(emptyFile1);
    fs.unlinkSync(emptyFile2);
  });

  test("should compare flat YAML files correctly", () => {
    const filepath1 = getFixturePath("file1.yml");
    const filepath2 = getFixturePath("file2.yml");
    const expected = readFile(getFixturePath("expected.txt")).trim();

    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expected);
  });
});

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
});
