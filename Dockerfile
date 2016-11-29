FROM node:4
USER root

ADD ./package.json /nodejs/package.json
WORKDIR /nodejs
RUN npm install

ADD . /nodejs/
RUN rm Dockerfile
RUN rm buildAndPush.sh

RUN npm run-script build

RUN npm test

RUN rm -Rf test

ENV NODE_ENV=production
RUN npm install

CMD npm run-script run
