import { parseFile } from "./src/parsers.js";

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  // TODO: Implement comparison logic
  console.log("File 1:", data1);
  console.log("File 2:", data2);

  return "diff";
};

export default genDiff;
