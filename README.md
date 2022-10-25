
<h1 align="center">
  <div style="display:inline-block;vertical-align: middle;">
    <a name="logo" href="https://ontimizeweb.github.io/docs/v8/report/">
      Ontimize Web Report
    </a>
  </div>
</h1>

<p align="center">
  <a href="#-introduction">Introduction</a> •
  <a href="#-ideas">Ideas</a> •
  <a href="#gear-development">Development</a>
</p>

## 📜 Introduction

The module Ontimize Web Report is a set of reporting tools for web applications based in [OntimizeWeb](https://github.com/OntimizeWeb/ontimize-web-ngx), allowing stored and on-demand reporting to be generated.

### 📖 Documentation

Check out our [documentation site](https://ontimizeweb.github.io/docs/v8/report/) to know more details.

## 💡 Ideas

We would love any feedback you have or to know when you encounter issues, by filing an issue report on this repo.


## :gear: Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

### Installation

Follow the next steps:

  - cd repository root
```bash
npm install
```
  - cd projects/ontimize-web-ngx-report
```bash
npm install
```

### Build

We have a script to build the library.

`npm run build`

It will create the distribution folder and pack this to use it as a npm package in a .tgz file but you can run those tasks separately.

The script `build` executes the following commands:

    - ng build
    - cd dist && npm pack (From the distribution folder we create a .tgz file to import in our project)

