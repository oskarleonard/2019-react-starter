const path = require('path');
const express = require('express');
const compression = require('compression');
const httpProxy = require('http-proxy');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
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
apiMockRouter.use(bodyParser.json()); // Needed to get body data on POSTs (password, username)
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

apiMockRouter.post('/login', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (userName === 'oskar' && password === 'oskar') {
    // Depending on your API and Design this res will vary. Best would proably be { access_token: '', roles:[] } after a login
    const loginRes = {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiNGU5YmJjMWY2MzA4ZTQ5ZTEwZWNlNzA4MjAzMWViMzBlOTIyNWRlMDg2ZTA3ZjkxNjk0ZWVjNmRhNjEwM2NmZThlNWY3ZmRiYTY3NzIxIn0.eyJhdWQiOiIyIiwianRpIjoiMGI0ZTliYmMxZjYzMDhlNDllMTBlY2U3MDgyMDMxZWIzMGU5MjI1ZGUwODZlMDdmOTE2OTRlZWM2ZGE2MTAzY2ZlOGU1ZjdmZGJhNjc3MjEiLCJpYXQiOjE1NDc3MTY5NDksIm5iZiI6MTU0NzcxNjk0OSwiZXhwIjoxNTc5MjUyOTQ5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.UyFBanSAG_LgHs4JgA61AcIbs5KsdwIGp4jDcTZHTcnhRd-_1vuZ5mrWI5IIYSAYDzaVJ9i95l-_7Sozcjc8tkVJZFengFiOwJxIU1AVzfTR-d0tKyyvrSoJO9MC-FpRlS7iOewETj5FwJw2dc19TH_zWB9GTFnmk8bJDxRoWd5DUTcjZnlINdjR2nAj_stbVfPigR8_PFzAgtRUx_SecwEWxHx0C3afVa6QdqwK7GtRPEt4ao9KpBh4nP8BNaSjSfnP-Pjy2G_22rWMybcBfaWB6TW7bSemj_WKDGPRDoPnemhLzV-kvyRozadZ2cewxJ7uRC8xVVKll-s0g2tuTLyFpwA3gpXpNKQyYEeVjCEHU6c3ykuCYQhlOW4KEd5TbdJwk8RnAm9p3P5RwYmw9IqowHkMT4y9fK6MBrO-aPhrlSfg_TA5RJzhX44IUblOFj64ogy6WEUUBU599MedbbhF8JFrCsyk7-gOm-vbHeZseCvkuCic7w9bimw6clV3ig_Pd6qwd-tLWHOzxTZNci5Wq5_pg5UZs_N0tesRIZzcp06XIi1btSmu4gBDK-PAWBS39o9CUfnMt-zeJutysWYd_H2mjZ1nGbdsFkl1ql42_jw6SHg3jiIHSU0BDOstOcVHZn9ryZHViPkJvYd0XjENAPXuSKnPQsn5MxzjQDs',
      user: {
        id: 1,
        email: 'ivo.wapstra@wearelevels.com',
        firstName: 'Ivo',
        lastName: 'Wapstra',
        roles: [
          {
            id: 1,
            name: 'SUPER_ADMIN',
          },
        ],
      },
    };

    res.send(loginRes);
  } else {
    res.status(401).send('Unauthorized login');
  }
});

apiMockRouter.get('/profile', (req, res) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const loginRes = {
      user: {
        id: 1,
        email: 'ivo.wapstra@wearelevels.com',
        firstName: 'Ivo',
        lastName: 'Wapstra',
        roles: [
          {
            id: 1,
            name: 'SUPER_ADMIN',
          },
        ],
      },
    };

    res.send(loginRes);
  } else {
    res.status(401).send('Unauthorized No Access Token');
  }
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
