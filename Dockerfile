FROM node:12.16.2

ARG SOURCE_DIR="."

RUN mkdir -p /srv/ensembl-docs-server

COPY ${SOURCE_DIR} /srv/ensembl-docs-server

WORKDIR /srv/ensembl-docs-server

ENV NODE_ENV production

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start-server" ]