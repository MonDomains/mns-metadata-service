FROM node:23.6.1

WORKDIR /usr/local/app

COPY package.json ./
COPY tsconfig.json ./
COPY docgen.js ./
COPY src ./src
RUN mkdir -p dist/assets && cp -r src/assets dist

RUN yarn
RUN yarn build

USER root
RUN apt-get install fontconfig && fc-cache -f -v
RUN chmod a+rw -R /home

EXPOSE 8080

RUN useradd app
USER app

CMD ["yarn", "start"]