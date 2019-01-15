const shell = require('shelljs');

shell.exec('sh scripts/hooks/prepare-commit-msg.sh ' + process.env.GIT_PARAMS);
