function objFrom(search) {
  if (!search) {
    return {}
  }

  const arr = search.slice(1).split('&')
  return arr.reduce((accu, curr) => {
    const [key, val] = curr.split('=')
    if (accu[key]) {
      accu[key] = [accu[key], val]
    } else {
      accu[key] = val
    }

    return accu
  }, {})
}

function appendQuery(url, key, value) {
  const hasQuery = url.indexOf('?') > -1
  return hasQuery ? url + `&${key}=${value}` : url + `?${key}=${value}`
}

export { objFrom, appendQuery }
