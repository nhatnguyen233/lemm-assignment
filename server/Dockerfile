FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY tests ./tests

RUN npm install
RUN npm run build

EXPOSE 8001

ENV PORT 8001

CMD ["npm", "run", "start"]
