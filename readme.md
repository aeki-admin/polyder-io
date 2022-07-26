# polyder-io
Easily create a resume and host it as a web page.

# Getting Started

1. Create a folder and run `npm init`
2. Add `"start": "npx polyder-io",` to scripts of `package.json`
3. Create a config file, `.polyder-io.js`, in the project folder. 
4. Run `npm start`

# Config File Example
You can utilize javascript with the config. 
```javascript
module.exports = {
  port: 8888,
  ga: 'GOOGLE_ANALYTICS_ID',
  data: [
    {
      "public": true,
      "default": true,
      // "id": "alt", // There can be multiple version of resume and can be accessed with an ID. EX. localhost:8888/alt
      "name": "John Doe",
      "role": "Web Developer",
      "email": "johnDoe@polyder.io",
      "address": "Vancouver, BC, Canada",
      "phone": "123-456-7890",
      "description": "Some Description",
      "experience": [
        {
          "title": "Developer II",
          "titleDesc": "Awesome Devlopment Company",
          "start": "Jan 2018",
          "end": "<b><highlight><uppercase>Current</uppercase></highlight></b>",
          "tags": [
            "mongodb",
            "fastify",
            "react.js",
            "react native",
            "typescript"
          ],
          "list": [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            "t was popularised in the 1960s with the release of Letraset sheets."
          ]
        },
        {
          "title": "Web Developer II",
          "titleDesc": "Just Another Company",
          "start": "Nov 2016",
          "end": "Dev 2017",
          "tags": [
            "express",
            "react.js"
          ],
          "list": [
            "Contrary to popular belief, Lorem Ipsum is not simply random text.",
            "Latin words, consectetur, from a Lorem Ipsum passage."
          ]
        },
        {
          "title": "Web Developer I",
          "titleDesc": "Good Company",
          "start": "Feb 2016",
          "end": "Sep 2016",
          "tags": [
            "php",
            "mysql",
            "wordress"
          ],
          "list": [
            "There are many variations of passages of Lorem Ipsum available.",
            "If you are going to use a passage of Lorem Ipsum, you need."
          ]
        }
      ],
      "education": [
        {
          "title": "AIT, Bachelor's Degree in CST",
          "start": "Jan 2012",
          "end": "Jan 2016",
          "description": "Computer Science"
        },
      ],
      "projects": [
        {
          "title": "Some Mobile App",
          "titleDesc": "All the Lorem Ipsum generators on the Internet tend.",
          "start": "May 2022",
          "description": "<a href=\"https://appstore.com/some-mobile-app\" target=\"_blank\">https://appstore.com/some-mobile-app</a>",
          "tags": [
            "react-expo",
            "open source"
          ]
        },

      ],
      "links": [
        {
          "title": "This Resume",
          "titleDesc": "<a href=\"https://test.io\">https://test.io</a>"
        },
        {
          "title": "Github",
          "titleDesc": "<a href=\"https://github.com\">https://github.com</a>"
        },
        {
          "title": "LinkedIn",
          "titleDesc": "<a href=\"https://ca.linkedin.com\">https://ca.linkedin.com</a>"
        }
      ],
      "skills": [
        {
          "title": "Testing"
        },
        {
          "title": "CI/CD"
        },
        {
          "title": "Docker"
        },
      ]
    },
  ]
}
```

You can write HTML code to the text and, common markup is provided: 
```html
<uppercase>[SOME_TEXT]</uppercase>
<highlight>[SOME_TEXT]</highlight>
```


# Getting Started for Development
Run `npm link` and run `npm start` in `./example`