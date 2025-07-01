import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJSON from './json.js';

function formattedTree(data, format, replacer) {
  switch (format) {
    case 'stylish':
      return makeStylish(data, replacer);
    case 'plain':
      return makePlain(data);
    case 'json':
      return makeJSON(data);
    default:
      throw new Error(`Invalid file format type: '.${format}'! Try supported file formats.`);
  }
}

export default formattedTree;
