#! /usr/bin/env node

const http = require('http')
const fs = require('fs')
const path = require('path')
const minify = require('html-minifier').minify

const CONFIG = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, "utf8"))['polyder-io'];
const DEFAULT = CONFIG?.data?.filter?.((a) => a.default)?.[0]

function generateResume({ content, res }) {
  fs.readFile(`${__dirname}/index.html`, "utf8", (err, data) => {
    res.writeHeader(200, { "Content-Type": "text/html" })

    const parsed = data.replace('{{ DATA }}', JSON.stringify(content))
      .replaceAll('{{ COLOR_BACKGROUND }}', '#efefef')
      .replaceAll('{{ COLOR_SHADOW }}', 'rgba(0,0,0,0.1)')
      .replaceAll('{{ COLOR_PRIMARY }}', '#5935de')
      .replaceAll('{{ NAME }}', content?.name)
      .replaceAll('{{ DESCRIPTION }}', content?.description)
      .replaceAll('{{ ROLE }}', content?.role)
    
    res.write(minify(parsed, {
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      sortAttributes: true,
    }))
    res.end()
  })
}

http.createServer(function (req, res) {
  const picked = CONFIG?.data?.filter?.((a) => a.id === req.url.replace('/', ''))?.[0]
  if (picked || req.url === '/') {
    generateResume({ res, content: picked || DEFAULT })
  } else {
    try {
      var filePath = path.join(`${__dirname}/public`, req.url);
      var stat = fs.statSync(filePath);

      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
      });

      var readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } catch (e) {
      generateResume({ res, content: DEFAULT })
    }
  }

}).listen(CONFIG?.port || 8080);

console.log(`polyder.io | started on port ${CONFIG?.port || 8080}`)
