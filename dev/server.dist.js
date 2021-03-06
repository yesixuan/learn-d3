const chalk = require('chalk');
const webpackConfig = require('./webpack.dist');
const server = require('pushstate-server');
const config = require('../app.config.js');

let { port, host } = config.server;
port += 1;

server.start({
  port: port,
  directory: webpackConfig.output.path,
});

const url = `http://${host}:${port}`;

console.log(chalk.green(`Dist server listening on ${url} ...`));