#! /usr/bin/env node

const fs = require('fs')
const minify = require('html-minifier').minify
const POLYDERCONFIG = require('./.polyder-io')
const CONFIG = POLYDERCONFIG?.data?.[0]
const SETCONFIG = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, "utf8"))['polyder-io'];
const DEFAULT = SETCONFIG?.data?.filter?.((a) => a.default)?.[0]

function generateResume() {
  const content = CONFIG || DEFAULT

  fs.readFile(`${__dirname}/index.html`, "utf8", (err, data) => {
    const parsed = data.replace('{{ DATA }}', JSON.stringify(content))
      .replaceAll('{{ COLOR_BACKGROUND }}', '#efefef')
      .replaceAll('{{ COLOR_SHADOW }}', 'rgba(0,0,0,0.1)')
      .replaceAll('{{ COLOR_PRIMARY }}', '#5935de')
      .replaceAll('{{ GA }}', POLYDERCONFIG?.ga)
      .replaceAll('{{ NAME }}', content?.name)
      .replaceAll('{{ DESCRIPTION }}', content?.description)
      .replaceAll('{{ WEBSITE }}', content?.website)
      .replaceAll('{{ ROLE }}', content?.role)
      

    const payload = minify(parsed, {
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      sortAttributes: true,
    })

    console.log(`polyder.io | writing to file build.html...`)
    fs.writeFile(`${__dirname}/build.html`, payload, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
      console.log(`polyder.io | done writing to build.html...`)
    });
  })
}

console.log(`polyder.io | building...`)

generateResume()

console.log(`polyder.io | done building...`)