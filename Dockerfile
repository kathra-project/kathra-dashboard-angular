FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy sources

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

COPY src /usr/src/app/src
COPY server.js /usr/src/app/server.js
COPY server /usr/src/app/server
COPY angular.json /usr/src/app/angular.json
COPY tsconfig.json /usr/src/app/tsconfig.json
COPY tslint.json /usr/src/app/tslint.json
COPY protractor.conf.js /usr/src/app/protractor.conf.js
COPY karma.conf.js /usr/src/app/karma.conf.js
COPY yarn.lock /usr/src/app/yarn.lock
COPY pug-rule-insert.js /usr/src/app/pug-rule-insert.js

# Install dependencies
RUN npm i
RUN npm run post-install

# Build
RUN npm run build

# Expose endpoint
EXPOSE 8080

# Launch command
CMD sed -i -e "s@\${KEYCLOAK_REALM}@${KEYCLOAK_REALM}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && sed -i -e "s@\${KEYCLOAK_AUTH_URL}@${KEYCLOAK_AUTH_URL}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && sed -i -e "s@\${KEYCLOAK_CLIENT_ID}@${KEYCLOAK_CLIENT_ID}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && sed -i -e "s@\${KEYCLOAK_CLIENT_SECRET}@${KEYCLOAK_CLIENT_SECRET}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && node server.js
