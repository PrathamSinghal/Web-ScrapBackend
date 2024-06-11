"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./routes/user.routes");
const Logger_1 = require("./utils/Logger");
// import {winston_logger,winston_logger_file}from './utils/winston-logger';
const responseMessage_1 = require("./utils/responseMessage");
const dotenv = __importStar(require("dotenv"));
require("module-alias/register");
const glob_1 = __importDefault(require("glob"));
dotenv.config();
const path_1 = __importDefault(require("path"));
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
    constructor() {
        this.Logger = Logger_1.logger;
        this.initRoutes = (app) => {
            // including all routes
            (0, glob_1.default)(path_1.default.join(__dirname, 'Routes', '*.js'), {
                cwd: path_1.default.resolve("./src")
            }, (err, routes) => {
                if (err) {
                    ////console.log("Error occured including routes");
                    return;
                }
                routes.forEach((routePath) => {
                    require(routePath).getRouter(app); // eslint-disable-line
                });
                app.get('*', (req, res) => {
                    console.log(req, "ismeaaya1");
                    console.log(req.url, "req.url");
                    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
                        let url = (req.url.split('?')[0]).replace('/webPanel', '');
                        res.sendFile(path_1.default.resolve(path_1.default.join(__dirname, '..', '..', '..', 'Web-Scraper', 'build', url)));
                    }
                    else
                        res.sendFile(path_1.default.resolve(path_1.default.join(__dirname, '..', '..', '..', 'Web-Scraper', 'build', 'index.html')));
                });
            });
        };
        this._instance = (0, express_1.default)();
        this._instance.set('view engine', 'ejs');
        this._instance.set('views', path_1.default.join(__dirname, 'views'));
        this._instance.use(express_1.default.json({ limit: '5000mb' }));
        this._instance.use(express_1.default.urlencoded({ limit: '5000mb', extended: false, parameterLimit: 5000000 }));
        this._instance.use((0, cors_1.default)());
        this._instance.use(express_1.default.json());
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
        this._instance.use('*', (req, res) => {
            console.log("ismeaaya2");
            console.log(path_1.default.join(__dirname, '..', '..', '..', 'Web-Scraper'), "path.joi");
            console.log(req, "request");
            console.log(req.url, "requesturl");
            console.log(req.baseUrl, "baseUrl");
            if (allowedExt.filter(ext => req.baseUrl.indexOf(ext) > 0).length > 0) {
                let url = (req.url.split('?')[0]).replace('/webPanel', '');
                console.log(req.baseUrl, "baseUrl1");
                console.log(url, "finalurl");
                res.sendFile(path_1.default.resolve(path_1.default.join(__dirname, '..', '..', '..', 'Web-Scraper', 'build', req.baseUrl)));
            }
            else
                res.sendFile(path_1.default.resolve(path_1.default.join(__dirname, '..', '..', '..', 'Web-Scraper', 'build', 'index.html')));
        });
        this._instance.use('/apiDoc', express_1.default.static(path_1.default.resolve(__dirname, "doc/")));
        this._instance.use('/api/user/', user_routes_1.userRoutes);
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
        this._instance.use((err, req, res, next) => {
            res.status(400).json(responseMessage_1.resObj.InvalidJson(err.message));
            Logger_1.logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        });
        // Capture 404 erors
        this._instance.use((req, res, next) => {
            res.status(404).json(responseMessage_1.resObj.pageNotFound(req.originalUrl));
            Logger_1.logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        });
    }
    get instance() {
        return this._instance;
    }
}
exports.default = new Application();
//# sourceMappingURL=app.js.map