import express = require('express');
import mongoose = require('mongoose');
import cors = require('cors');
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { ApiRoutes } from '../routes/api-routes';
import { CommonRoutes } from '../routes/common-routes';

dotenv.config();

class App {
    public app: Application;
    public mongoUrl: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3wk41.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    private apiRoutes: ApiRoutes = new ApiRoutes();
    private commonRoutes: CommonRoutes = new CommonRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.apiRoutes.route(this.app);
        this.commonRoutes.route(this.app);
    }

    // private config(): void {
    //   this.app.use(cors());
    //   this.app.options('*', cors());
    //   // support application/json type post data
    //   this.app.use(bodyParser.json());
    //   //support application/x-www-form-urlencoded post data
    //   this.app.use(bodyParser.urlencoded({ extended: false }));
    // }
    private config(): void {
    // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.configStaticFileServing(this.app);
    }

    private configStaticFileServing(app: Application): void {
        app.use(express.static('client'));
    }

    private mongoSetup(): void {
        mongoose
            .connect(this.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .catch(err => {
                console.log(err);
            });
    }
}
export default new App().app;
