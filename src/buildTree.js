import _ from 'lodash';

function buildTree(data1, data2) {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, state: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, state: 'deleted', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, state: 'nested', value: buildTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, state: 'changed', value1: data1[key], value2: data2[key],
      };
    }

    return { key, state: 'unchanged', value: data1[key] };
  });
}

export default buildTree;
