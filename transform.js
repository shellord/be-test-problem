import fs from 'fs'

const FILE_PATH = './data.txt'
const OUTPUT_PATH = './output.txt'

const transform = (data, OUTPUT_PATH) => {
  const addToOutput = (content) => {
    fs.appendFile(OUTPUT_PATH, content, (err) => {
      if (err) {
        console.error(err)
      }
    })
  }
  const REST_OF_THE_COLS = '|Flag|Description\n'
  const lines = data.split('\n')
  const headerLine = lines[0]
  addToOutput(headerLine + REST_OF_THE_COLS)
  const rest_of_the_lines = lines.slice(1)

  rest_of_the_lines.forEach((line) => {
    let columns_to_append = '||'
    if (line.split('|')[4].includes('AEPS')) {
      columns_to_append = '|AEPS|'
    } else if (line.split('|')[4].includes('FEE CHG')) {
      columns_to_append = '|FEE CHG|'
    }
    addToOutput(
      line + columns_to_append + line.split('|')[4].split('/')[0] + '\n'
    )
  })
}

try {
  const data = fs.readFileSync(FILE_PATH, 'utf8')
  transform(data, OUTPUT_PATH)
} catch (err) {
  console.error(err)
}
