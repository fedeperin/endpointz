export default (json: object | string) => {
  if (typeof json != 'string') {
    json = JSON.stringify(json, null, 2)
  }
  
  json = json
    .replace(/&/g, '&amp')
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt')
  
  return json.replace(
    // eslint-disable-next-line no-useless-escape
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match: string) => {
      let color = 'blueviolet' // Number

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          color = 'teal' // Key
        } else {
          color = 'red' // String
        }
      } else if (/true|false/.test(match)) {
        color = 'blue' // Boolean
      } else if (/null/.test(match)) {
        color = 'blue' // Null
      }
      return `<span style="color: ${ color };">${ match }</span>`
    }
  )
}
