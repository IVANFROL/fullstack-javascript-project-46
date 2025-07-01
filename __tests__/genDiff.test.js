import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const extensions = ['json', 'yml'];
const correct = {
  stylish: readFile('correct-stylish.txt'),
  plain: readFile('correct-plain.txt'),
  json: readFile('correct-json.txt'),
};

describe('Positives cases', () => {
  extensions.forEach((ext) => {
    test(`Format ${ext.toUpperCase()}`, () => {
      const file1 = getFixturePath(`file1.${ext}`);
      const file2 = getFixturePath(`file2.${ext}`);
      expect(genDiff(file1, file2)).toEqual(correct.stylish);
      expect(genDiff(file1, file2, 'plain')).toEqual(correct.plain);
      expect(genDiff(file1, file2, 'json')).toEqual(correct.json);
    });
  });
});

describe('Negative cases', () => {
  test('Check wrong file extension', () => {
    const error = new Error("Invalid file extension: 'txt'! Try supported formats.");

    expect(() => {
      genDiff(getFixturePath('file1-wrong.txt'), getFixturePath('file2-wrong.txt'));
    }).toThrow(error);
  });
});
