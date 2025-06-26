import { parseFile } from "./src/parsers.js";
import buildDiff from "./src/comparator.js";

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  return buildDiff(data1, data2);
};

export default genDiff;
