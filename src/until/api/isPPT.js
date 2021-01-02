const pptExt = [
  'ppt',
  'pptx',
  'pps',
  'ppa',
  'pot',
  'ppsx',
  'rtf'
]

export default (filename) => {
  const arr = filename.split('.')
  return pptExt.includes(arr[arr.length - 1])
}
