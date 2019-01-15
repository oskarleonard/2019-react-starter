import { html } from 'common-tags';

export const get500 = () => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <p>500 ERROR</p>
      </body>
    </html>
  `;
};

export const getHtml = ({
  cssHash,
  js,
  stateJson,
  styles,
  reactDomString,
  helmet,
}) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()} ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no"
        />
        <link rel="stylesheet" href="https://use.typekit.net/mdl6aae.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
          rel="stylesheet"
        />
        ${styles}
      </head>
      <body>
        <div id="root">${reactDomString}</div>
        ${cssHash} ${js}
        <script>
          window.__SERVER_STATE__ = ${stateJson};
        </script>
      </body>
    </html>
  `;
};
