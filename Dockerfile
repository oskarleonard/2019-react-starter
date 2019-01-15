FROM node:10-alpine
COPY package.json ./
COPY _build_prod /_build_prod
# --no-optional: Stänger av varningar, --only=production: Bara dependencies som behövs
RUN npm install --no-optional --only=production
#[] används för att ctrl-c ska fungera: https://forums.docker.com/t/docker-run-cannot-be-killed-with-ctrl-c/13108
CMD ["npm", "run", "prod"]
