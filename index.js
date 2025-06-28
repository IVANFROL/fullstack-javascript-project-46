import { parseFile } from "./src/parsers.js";
import buildDiff from "./src/buildDiff.js";
import getFormatter from "./src/formatters/index.js";

const genDiff = (filepath1, filepath2, format = "stylish") => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default genDiff;
