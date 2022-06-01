#! /usr/bin/env node

const http = require('http')
const fs = require('fs')
const path = require('path')
const minify = require('html-minifier').minify
const clc = require("cli-color")

const PACAKGE_JSON_PATH = `${process.cwd()}/package.json`
const CONFIG_PATH = `${process.cwd()}/.polyder-io.js`

try {

  let CONFIG 
  if (fs.existsSync(CONFIG_PATH)) {
    CONFIG = require(CONFIG_PATH)
  } else if (fs.existsSync(PACAKGE_JSON_PATH)) {  
    CONFIG = JSON.parse(fs.readFileSync(PACAKGE_JSON_PATH, "utf-8"))['polyder-io'];
  }

  if (!CONFIG) {
    throw `${clc.magenta("polyder-io:")} ${clc.red("error:")} Please create '.polyder-io.js or add a 'polyder-io' to your package.json. Read more at https://www.npmjs.com/package/polyder-io`
  }  

  const DEFAULT = CONFIG?.data?.filter?.((a) => a.default)?.[0]

  function generateResume({ content, res }) {
    fs.readFile(`${__dirname}/index.html`, "utf-8", (err, data) => {
      res.writeHeader(200, { "Content-Type": "text/html" })

      let parsed = data.replace('{{ DATA }}', JSON.stringify(content))
        .replaceAll('{{ COLOR_BACKGROUND }}', '#efefef')
        .replaceAll('{{ COLOR_SHADOW }}', 'rgba(0,0,0,0.1)')
        .replaceAll('{{ COLOR_PRIMARY }}', '#5935de')
        .replaceAll('{{ NAME }}', content?.name)
        .replaceAll('{{ DESCRIPTION }}', content?.description)
        .replaceAll('{{ ROLE }}', content?.role)
      
      if(content?.image) {
        const image = (`
          <link rel="preload" as="image" href=${content?.image} />
          <meta name="twitter:image" content=${content?.image}></meta>
          <meta property="og:image" content=${content?.image}></meta>
          <meta property="og:image:width" content="1920"></meta>
          <meta property="og:image:height" content="1080"></meta>
        `)
        parsed = parsed.replaceAll('{{ IMAGE }}', image)
      } else {
        parsed = parsed.replaceAll('{{ IMAGE }}', '')
      }
      
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
    if (fs.existsSync(CONFIG_PATH)) {
      CONFIG = require(CONFIG_PATH)      
    } else if (fs.existsSync(PACAKGE_JSON_PATH)) {  
      CONFIG = JSON.parse(fs.readFileSync(PACAKGE_JSON_PATH, "utf-8"))['polyder-io'];
    }

    const picked = CONFIG?.data?.filter?.((a) => a.id === req.url.replace('/', ''))?.[0]
    
    if (picked || req.url === '/') {
      console.log(`${clc.magenta("polyder-io:")} ${clc.green("log:")} request on resume -> ${picked?.id || 'default'}`)
      generateResume({ res, content: picked || DEFAULT })
    } else {
      try {
        console.log(`${clc.magenta("polyder-io:")} ${clc.green("log:")} request on file -> ${req.url}`)

        var filePath = path.join(`${__dirname}/public`, req.url);
        var stat = fs.statSync(filePath);

        res.writeHead(200, {          
          'Content-Length': stat.size
        });

        var readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
      } catch (e) {
        generateResume({ res, content: DEFAULT })
      }
    }

  }).listen(CONFIG?.port || 8080);

  console.log(`${clc.magenta("polyder-io:")} ${clc.green("log:")} started on port ${CONFIG?.port || 8080}`)

} catch (e) {
  console.error(e)
}
