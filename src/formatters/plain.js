import _ from "lodash";

const formatValue = (value) => {
  if (_.isObject(value) && value !== null) {
    return "[complex value]";
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return String(value);
};

const iter = (tree, ancestry = []) => {
  const lines = tree.flatMap((node) => {
    const path = [...ancestry, node.key].join(".");
    switch (node.type) {
      case "nested":
        return iter(node.children, [...ancestry, node.key]);
      case "added":
        return `Property '${path}' was added with value: ${formatValue(
          node.value
        )}`;
      case "removed":
        return `Property '${path}' was removed`;
      case "updated":
        return `Property '${path}' was updated. From ${formatValue(
          node.oldValue
        )} to ${formatValue(node.newValue)}`;
      default:
        return [];
    }
  });
  return lines.join("\n");
};

const plain = (tree) => iter(tree);

export default plain;
