import _ from "lodash";

const getIndent = (depth, spacesCount = 4) =>
  " ".repeat(depth * spacesCount - 2);
const getBracketIndent = (depth, spacesCount = 4) =>
  " ".repeat((depth - 1) * spacesCount);

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) {
    return String(value);
  }
  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) =>
      `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
  );
  return `{
${lines.join("\n")}
${getBracketIndent(depth + 1)}}`;
};

const stylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    switch (node.type) {
      case "nested":
        return `${getIndent(depth)}  ${node.key}: ${stylish(
          node.children,
          depth + 1
        )}`;
      case "added":
        return `${getIndent(depth)}+ ${node.key}: ${stringify(
          node.value,
          depth
        )}`;
      case "removed":
        return `${getIndent(depth)}- ${node.key}: ${stringify(
          node.value,
          depth
        )}`;
      case "updated":
        return [
          `${getIndent(depth)}- ${node.key}: ${stringify(
            node.oldValue,
            depth
          )}`,
          `${getIndent(depth)}+ ${node.key}: ${stringify(
            node.newValue,
            depth
          )}`,
        ].join("\n");
      case "unchanged":
        return `${getIndent(depth)}  ${node.key}: ${stringify(
          node.value,
          depth
        )}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return `{
${lines.join("\n")}
${getBracketIndent(depth)}}`;
};

export default stylish;
