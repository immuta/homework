FROM node:12

ENV API_PORT=5000

# Copy everything into the build:
COPY backend/package.json backend/yarn.lock backend/server.js /opt/countries-web/
COPY ui/ /opt/countries-web/ui/

# Compile the Angular build:
WORKDIR /opt/countries-web/ui/
RUN yarn install --non-interactive
RUN yarn run build:prod

# Install the node.js API dependencies:
WORKDIR /opt/countries-web/
RUN yarn install --non-interactive

EXPOSE ${API_PORT}

ENTRYPOINT ["node"]
CMD ["server.js"]
