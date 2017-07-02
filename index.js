/* eslint no-console: "off", global-require: "off" */

import 'colors';
import webpack from 'webpack';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import app from './server';

import config from './webpack.config';

let port = process.env.PORT || 3000;
let homepage = `${__dirname}/client/index.html`;

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(morgan('dev'));
  port = 7000;
  homepage = `${__dirname}/client/index.html`;
  app.use('/', express.static(path.join(__dirname, 'client')));
} else {
  app.use('/', express.static(path.join(__dirname, 'client')));
}

app.get('/', (req, res) => {
  res.sendFile(homepage);
});

app.get('*', (req, res) => {
  res.sendFile(homepage);
});

app.listen(port, () => {
  console.log(`Magic happening at: ${port}`.green);
});
