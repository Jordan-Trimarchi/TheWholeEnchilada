FROM node:14-alpine
WORKDIR /src
COPY . /src
RUN npm install 
EXPOSE 4747
USER node
CMD ["npm", "start"]
