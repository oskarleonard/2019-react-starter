const shell = require('shelljs');

shell.echo('Cleaning up old files...');
shell.exec('rimraf _build_prod/');
shell.mkdir('_build_prod');
shell.mkdir('_build_prod/bin');
shell.mkdir('_build_prod/server');
shell.mkdir('_build_prod/server/static');
shell.mkdir('_build_prod/server/static/fonts');

shell.echo('\nCompiling...');

shell.echo('[1/2]\twebpack/server.prod.js');
shell.exec(
  './node_modules/webpack/bin/webpack.js --progress --config webpack/server.prod.js'
);

shell.echo('[2/2]\twebpack/client.prod.js');
shell.exec(
  './node_modules/webpack/bin/webpack.js --progress -p --config webpack/client.prod.js'
);

shell.echo('\nCopying files...');
shell.cp('src/server/server.js', '_build_prod/server');
shell.cp('-R', 'src/server/static', '_build_prod/server');
shell.cp('-R', 'bin', '_build_prod');

shell.echo('\nDone!!');
