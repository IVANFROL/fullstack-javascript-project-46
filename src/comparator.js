import _ from "lodash";

const buildDiff = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  if (allKeys.length === 0) {
    return "{\n}";
  }

  const diff = allKeys.map((key) => {
    const hasKey1 = _.has(obj1, key);
    const hasKey2 = _.has(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!hasKey1) {
      return `  + ${key}: ${value2}`;
    }

    if (!hasKey2) {
      return `  - ${key}: ${value1}`;
    }

    if (value1 !== value2) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }

    return `    ${key}: ${value1}`;
  });

  return `{\n${diff.join("\n")}\n}`;
};

export default buildDiff;
