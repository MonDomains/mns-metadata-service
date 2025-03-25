FROM node:23.6.1

WORKDIR /usr/local/app

COPY package.json ./
COPY tsconfig.json ./
COPY docgen.js ./
COPY src ./src

RUN npm install --legacy-peer-deps
RUN npm run build
RUN cp -r src/assets dist

USER root
RUN apt-get install fontconfig && fc-cache -f -v
RUN chmod a+rw -R /home

EXPOSE 8080

RUN useradd app
USER app

CMD ["npm", "run", "start"]