import _ from 'lodash'

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]'
  }

  return _.isString(data) ? `'${data}'` : data
}

const makePlain = (diff) => {
  const iter = (tree, parent) =>
    tree.flatMap((node) => {
      const path = [...parent, node.key].join('.')

      switch (node.state) {
        case 'added':
          return `Property '${path}' was added with value: ${stringify(
            node.value,
          )}`
        case 'deleted':
          return `Property '${path}' was removed`
        case 'unchanged':
          return []
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(
            node.value1,
          )} to ${stringify(node.value2)}`
        case 'nested':
          return `${iter(node.value, [path]).join('\n')}`
        default:
          throw new Error(`Type: ${node.state} is undefined`)
      }
    })

  const plainDiff = iter(diff, [])
  return [...plainDiff].join('\n')
}

export default makePlain
