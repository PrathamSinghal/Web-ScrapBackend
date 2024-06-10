import express, { Application as ExApplication, Handler, } from 'express';
import cors from 'cors'
import { userRoutes } from './routes/user.routes';
import { logger } from './utils/Logger';
// import {winston_logger,winston_logger_file}from './utils/winston-logger';
import { resObj } from './utils/responseMessage';
import * as dotenv from "dotenv";
import 'module-alias/register';
import glob from 'glob'
dotenv.config();

import path from 'path';
import multer from 'multer';

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     max: 40, // limit each IP to 1 request per windowMs
//     message: "Too many request from this IP"
// });


class Application {

    private readonly _instance: ExApplication;
    get instance(): ExApplication {
        return this._instance;
    }
    Logger: any = logger
    constructor() {
        this._instance = express();
        this._instance.set('view engine', 'ejs');
        this._instance.set('views', path.join(__dirname, 'views'))
        this._instance.use(express.json({ limit: '5000mb' }))
        this._instance.use(express.urlencoded({ limit: '5000mb', extended: false, parameterLimit: 5000000 }))
        this._instance.use(cors());
        this._instance.use(express.json());


        // this._instance.use('/status', (req: express.Request, res: express.Response) => {
        //     res.json({
        //         status: 200
        //     })
        // })
        // this._instance.post('/debug', (req: express.Request, res: express.Response) => {
        //     var cdr = req.body;
        //     console.log(cdr);
        //     res.send('got it');
        
        // })

        
        this._instance.use('/apiDoc', express.static(path.resolve(__dirname, "doc/")));
        this._instance.use('/api/user/', userRoutes)

       
        this._instance.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            // res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });



        this._instance.use((err: any, req: any, res: any, next: any) => {
            res.status(400).json(resObj.InvalidJson(err.message))
            logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        })

        // Capture 404 erors
        this._instance.use((req, res, next) => {
            res.status(404).json(resObj.pageNotFound(req.originalUrl));
            logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        })


    }

    initRoutes = (app: any) => {
        // including all routes
        glob(path.join(__dirname, 'Routes', '*.js'), {
            cwd: path.resolve("./src")
        }, (err: any, routes: any) => {
            if (err) {
                ////console.log("Error occured including routes");
                return;
            }
            routes.forEach((routePath: any) => {
                require(routePath).getRouter(app); // eslint-disable-line
            });

        });
    }



}
export default new Application()
