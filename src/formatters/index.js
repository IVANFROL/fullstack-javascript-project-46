import stylish from "./stylish.js";
import plain from "./plain.js";
import jsonFormatter from "./json.js";

const getFormatter = (format) => {
  switch (format) {
    case "stylish":
      return stylish;
    case "plain":
      return plain;
    case "json":
      return jsonFormatter;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormatter;
