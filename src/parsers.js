import YAML from 'yaml'

export default (fileData, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(fileData)
    case 'yml':
    case 'yaml':
      return YAML.parse(fileData)
    default:
      throw new Error(
        `Invalid file extension: '${extension}'! Try supported formats.`,
      )
  }
}
