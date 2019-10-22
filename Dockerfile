FROM node:boron-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/package.json

# Install sources
COPY server.js /usr/src/app/server.js
COPY server /usr/src/app/server
RUN npm install
RUN npm build

# Expose endpoint
EXPOSE 8080

# Launch command
CMD sed -i -e "s@\${KEYCLOAK_REALM}@${KEYCLOAK_REALM}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && sed -i -e "s@\${KEYCLOAK_AUTH_URL}@${KEYCLOAK_AUTH_URL}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && sed -i -e "s@\${KEYCLOAK_CLIENT_ID}@${KEYCLOAK_CLIENT_ID}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && sed -i -e "s@\${KEYCLOAK_CLIENT_SECRET}@${KEYCLOAK_CLIENT_SECRET}@ig" /usr/src/app/dist/kathra-dashboard/assets/keycloak.json && node server.js
