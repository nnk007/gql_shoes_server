FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm i
RUN npm run generate
RUN npm run build
EXPOSE 4000
CMD npm run start