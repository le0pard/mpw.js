# [Master password generator](https://mpw.leopard.in.ua/) [![Build and Deploy](https://github.com/le0pard/mpw.js/actions/workflows/deploy.yml/badge.svg)](https://github.com/le0pard/mpw.js/actions/workflows/deploy.yml)

MPW.js is a JavaScript implementation of the [Master Password](https://en.wikipedia.org/wiki/Master_Password) algorithm

## Development

1. Install Ruby and Node.js (versions inside `.tool-versions`)
2. Install [ruby bundler](http://bundler.io/) and [node.js yarn](https://yarnpkg.com/en/)
3. Just execute in terminal:

```bash
$ bundle
$ yarn
```
4. Start application:

```bash
$ bundle exec middleman
```

and visit `http://localhost:4567`

## Deploy

```bash
$ bundle exec rake release
```
