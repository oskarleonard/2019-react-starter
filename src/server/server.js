const path = require('path');
const express = require('express');
const compression = require('compression');
const httpProxy = require('http-proxy');
const favicon = require('serve-favicon');
const morgan = require('morgan');
var uuid = require('uuid/v4');
const cookiesMiddleware = require('universal-cookie-express');

const res = (p) => path.resolve(__dirname, p);

const errorHandler = (err, req, res, next) => {
  console.error('server errorHandler', new Date().toUTCString(), err.stack);
  res.status(500).sendFile(path.join(`${__dirname}/500-sv.html`));
  next();
};

function assignId(req, res, next) {
  req.id = uuid();
  next();
}

const logFormat = function(tokens, req, res) {
  const xRequestToken = req.headers && req.headers['x-request-token'];
  const xForwardedHost = req.headers && req.headers['x-forwarded-host'];
  const hostname = tokens.hostname && tokens.hostname(req, res);

  return [
    `ID=${req.id}`,
    new Date().toUTCString(),
    `method=${tokens.method(req, res)}`,
    `url=${tokens.url(req, res)}`,
    `status=${tokens.status(req, res)}`,
    `content_length=${tokens.res(req, res, 'content-length')}`,
    `response_time=${tokens['response-time'](req, res)} ms`,
    `hostname=${hostname}`,
    `x_forwarded_host=${xForwardedHost}`,
    `node_env=${process.env.NODE_ENV}`,
    xRequestToken && `x-request-token=${xRequestToken}`,
  ].join('\t');
};

const app = express();
const proxy = httpProxy.createProxyServer();

app.use(compression());
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(errorHandler);
// Logging Setup
app.use(assignId);
app.use(morgan(logFormat));
// END Logging
app.use(cookiesMiddleware());

/* ------------------------------------------------ */
/* MOCK START */
const apiMockRouter = express.Router();
apiMockRouter.get('/home', (req, res) => {
  const mockDescription =
    'Minpant.se används för att överföra pantbelopp till mobila betalningsförmedlare';
  let metaRows = [
    {
      name: 'description',
      content: 'Home description',
    },
  ];

  res.send({
    text: mockDescription,
    helmetData: {
      title: 'Home',
      meta: metaRows,
    },
  });
});

apiMockRouter.get('/notFound', (req, res) => {
  const mockDescription = 'Page doesnt exists';
  let metaRows = [
    {
      name: 'description',
      content: 'Not found description',
    },
  ];
  res.send({
    text: mockDescription,
    helmetData: {
      title: 'Not found',
      meta: metaRows,
    },
  });
});

app.use('/mockApi', apiMockRouter);
/* MOCK END */
/* ------------------------------------------------ */

app.use('/api', (req, res) => {
  proxy.web(req, res, {
    target: 'https://some-api.com/api',
    changeOrigin: true,
  });
});

proxy.on('error', (error, req, res) => {
  console.log('--------PROXY ERROR--------');
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  res.end(JSON.stringify({ error: 'proxy_error', reason: error.message }));
});

module.exports = {
  app,
};
