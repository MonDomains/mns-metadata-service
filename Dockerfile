FROM node:23.7.0

WORKDIR /usr/local/app

COPY package.json ./
COPY tsconfig.json ./

RUN yarn install

COPY src ./src
RUN yarn build && yarn add cors

USER root
RUN apt-get install fontconfig && fc-cache -f -v
RUN chmod a+rw -R /home

EXPOSE 8080

RUN useradd app
USER app

CMD ["yarn", "start"]