exports.buildQuery = function (text) {
  let regex = this.buildRegex(text)
  if (!regex) {
    return {}
  }
  return {
    $or: [
      {title: regex},
      {memo: regex}
    ]
  }
}

exports.buildRegex = function (text) {
  if (!text || !text.trim().length) {
    return null
  }

  let words = text.trim().split(' ')
  let regex = words.join('.*')
  return new RegExp('.*' + regex + '.*')
}
