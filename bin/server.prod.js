require('dotenv').config();
const path = require('path');
const zlib = require('zlib');
const express = require('express');
const compression = require('compression');
const res = (p) => path.resolve(__dirname, p);

const { app } = require(res('../server/server'));

const clientStats = require(res('../client/stats.json')); // eslint-disable-line

const serverOutputPath = res('../server');
console.log('serverOutputPath: ', serverOutputPath);
const serverRender = require(`${serverOutputPath}/render.js`).default;

app.use('/levels-assets/', express.static(res('../client')));
app.use(
  compression({ flush: zlib.constants.Z_PARTIAL_FLUSH }),
  serverRender({ clientStats })
);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`);
});
