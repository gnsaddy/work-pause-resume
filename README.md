# Getting Started with Create React App with Flask RESTful API calls


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Backend folder notify

```react
install virtual enviroment 

then run -

% pip3 install requirements.txt

- running the app

% sh ./run.sh

```

### Environment setup

.env is a file where the actual API is stored

```dotenv
REACT_APP_BACKEND = http://127.0.0.1:5000/
```

### Docker image configuration for React app

```dockerfile

FROM node:10 AS builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

```

## Running the container

```shell

% docker build -t react-nginx .

% docker run --rm -it -p 8080:80 react-nginx 

```

### POSTMAN API documentation

```swagger codegen
https://documenter.getpostman.com/view/10646178/TWDdjE92
```