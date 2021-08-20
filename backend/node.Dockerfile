FROM node:14-alpine
WORKDIR /src
COPY . /src
RUN npm install 
EXPOSE 3000
USER node
CMD ["npm", "start"]
