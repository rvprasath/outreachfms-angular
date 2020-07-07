# Outreachfms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build

## Outreachfms angular

<b>Outreach fms angular application local setup</b>

This angular app needs to be configured for CORS with spring boot running in backend.

That needs few setup

open <b>proxy.config.json</b> file. To access that file in this repository click <a href="https://github.com/rvprasath/outreachfms-angular/blob/master/proxy.config.json">proxy.config.json</a>

<pre>
{
    "/outreachfms/*": {
        "target": "http://localhost:8080",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
    }
}
</pre>

The above is the code snippet of the CORS dev server proxy config file.

<pre>
"target": "http://localhost:8080"
</pre>

The above line contains the url, which is the url of the spring boot application of outreach fms running in the localhost.
This need to be changed accordingly to the environment. incase if the spring boot application is running in the ip 192.168.1.1 in port 8082
then the url should be <b>http://192.168.1.1:8082</b>

<b>Running the application </b>

1) Download and install Node js server.
2) Download and install visual studio code.

Open visual studio code then in the side menu open the source control and clone this git repository.

Then build the application using the command.
<pre>ng build</pre>

This application must be start with the command
<pre>npm start</pre>
this will auto configure the CORS dev proxy.

otherway to run the application is
<pre>ng serve --proxy-config proxy.conf.json</pre>
here the application is started manually by enaabling the proxy.

