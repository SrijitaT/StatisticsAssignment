FROM node:10
WORKDIR /app
COPY . /app
RUN cd server&&npm install
RUN cd client&&npm install
RUN cd client&&npm run build
CMD cd server&&npm start
