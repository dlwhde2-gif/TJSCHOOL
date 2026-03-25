const fs = require('fs')
const buf = fs.readFileSync('src/pages/HistoryPage.jsx')
let text = ''
if (buf[0] === 0xff && buf[1] === 0xfe) {
  text = buf.toString('utf16le')
} else {
  text = buf.toString('utf8')
}
fs.writeFileSync('src/pages/HistoryPage.jsx', text, 'utf8')
console.log(text.substring(0, 1000))
