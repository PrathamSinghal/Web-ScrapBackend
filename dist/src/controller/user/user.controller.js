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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const responseMessage_1 = require("../../utils/responseMessage");
const _httpStatus_1 = require("../../utils/_httpStatus");
const puppeteer_1 = __importDefault(require("puppeteer"));
const scrap_service_1 = require("../../services/scrap.service");
class userController {
    constructor() {
    }
    scrapData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { webUrl } = req.body;
                console.log(webUrl, "webUrl");
                // Launch the browser and open a new blank page
                const browser = yield puppeteer_1.default.launch();
                const page = yield browser.newPage();
                // Navigate the page to a URL
                yield page.goto(webUrl);
                const data = yield page.evaluate(() => {
                    const getMetaTagContent = (name) => {
                        const meta = document.querySelector(`meta[name="${name}"]`);
                        return meta ? meta.getAttribute('content') : null;
                    };
                    const getLinkHref = (selector) => {
                        const link = document.querySelector(selector);
                        return link ? link === null || link === void 0 ? void 0 : link.href : null;
                    };
                    const getLinkHrefEmail = (selector) => {
                        const link = document.querySelector(selector);
                        return link ? [link === null || link === void 0 ? void 0 : link.href.split(':')[1]] : null;
                    };
                    const getPhoneHref = (selector) => {
                        const link = document.querySelector(selector);
                        return (link === null || link === void 0 ? void 0 : link.innerText) ? link === null || link === void 0 ? void 0 : link.href.split(':')[1] : null;
                    };
                    const getImageSrc = (selector) => {
                        const img = document.querySelector(selector);
                        return img ? img.src : null;
                    };
                    const getEmails = () => {
                        var _a;
                        const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/g;
                        const bodyText = (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.innerText;
                        const emails = bodyText === null || bodyText === void 0 ? void 0 : bodyText.match(emailRegex);
                        return emails ? [...new Set(emails)] : null;
                    };
                    const getAddress = () => {
                        var _a;
                        // Try to fetch the address from various common selectors
                        const addressSelectors = [
                            '[itemprop="address"]',
                            '.address',
                            'address',
                            '.contact-address',
                            '.footer-address',
                            '.office-address'
                        ];
                        for (const selector of addressSelectors) {
                            const element = document.querySelector(selector);
                            if (element) {
                                return (_a = element === null || element === void 0 ? void 0 : element.innerText) === null || _a === void 0 ? void 0 : _a.trim();
                            }
                        }
                        return null;
                    };
                    const getCompanyName = () => {
                        var _a;
                        // Try to fetch the company name from various common selectors
                        const companySelectors = [
                            '[itemprop="name"]',
                            'meta[property="og:site_name"]',
                            'meta[name="application-name"]',
                            '.company-name',
                            '.site-title',
                            'h1',
                            'title'
                        ];
                        for (const selector of companySelectors) {
                            const element = document.querySelector(selector);
                            if (element) {
                                return element.content ? element.content : (_a = element.innerText) === null || _a === void 0 ? void 0 : _a.trim();
                            }
                        }
                        return null;
                    };
                    const getLogo = () => {
                        // Try to fetch the logo from various common selectors
                        const logoSelectors = [
                            'img[alt*="logo"]',
                            'img[src*="logo"]',
                            'img[class*="logo"]',
                            'img#logo',
                            'img.logo',
                            'img.site-logo'
                        ];
                        for (const selector of logoSelectors) {
                            const element = document.querySelector(selector);
                            if (element) {
                                return element.src;
                            }
                        }
                        return null;
                    };
                    return {
                        name: document.title || null,
                        companyName: getCompanyName(),
                        description: getMetaTagContent('description'),
                        logo: getLogo(),
                        facebook: getLinkHref('a[href*="facebook.com"]'),
                        linkedin: getLinkHref('a[href*="linkedin.com"]'),
                        twitter: getLinkHref('a[href*="twitter.com"]'),
                        instagram: getLinkHref('a[href*="instagram.com"]'),
                        address: getAddress(),
                        phone: getPhoneHref('a[href*="tel:"]') || null,
                        emails: getLinkHrefEmail('a[href*="mailto:"]') || getEmails()
                    };
                });
                let screenshot = yield page.screenshot({
                    fullPage: true
                });
                console.log(screenshot, "screenshot");
                const base64String = Buffer.from(screenshot).toString("base64");
                console.log(data);
                let scrapData = Object.assign(Object.assign({}, data), { webUrl: webUrl, screenshot: base64String });
                let dataScrap = yield scrap_service_1.ScrapService.create(scrapData);
                yield browser.close();
                return res.status(200).json({
                    data: dataScrap,
                    message: "Website Data Saved"
                });
                // await page.waitForSelector("h1")
                // const pageTitle = await page.title();
                // console.log(pageTitle,"pageTitle");
                // let dom2 = await page.evaluate(() => {
                //     return document.head.querySelector('meta[property="og:description"]').getAttribute("content");
                // });
                // console.log(dom2);
                // let heading = await page.evaluate(() => {
                //     const h1 = document.body.querySelector("h1")
                //     console.log(document.body,"document.body");
                //     return h1.innerText
                // })
                // console.log(heading,"heading");
                // const pageUrls = await page.evaluate(() => {
                //     const urlArray = Array.from(document.links).map((link) => link.href);
                //     const uniqueUrlArray = [...new Set(urlArray)];
                //     return uniqueUrlArray;
                //   });
                //   console.log(pageUrls);
                // // Set screen size
                // await page.setViewport({width: 1080, height: 1024});
                // // Type into search box
                // await page.type('.devsite-search-field', 'automate beyond recorder');
                // // Wait and click on first result
                // const searchResultSelector = '.devsite-result-item-link';
                // await page.waitForSelector(searchResultSelector);
                // await page.click(searchResultSelector);
                // // Locate the full title with a unique string
                // const textSelector = await page.waitForSelector(
                //   'text/Customize and automate'
                // );
                // console.log(textSelector,"textSelector")
                // const fullTitle = await textSelector?.evaluate(el => el.textContent);
                // console.log(fullTitle,"fullTitle")
                // // Print the full title
                // console.log('The title of this blog post is "%s".', fullTitle);
            }
            catch (error) {
                console.log(error, "err");
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
    scrapList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let querys = req.query;
                let query = {
                    page: parseInt(querys.page) || 1,
                    limit: parseInt(querys.limit) || 10,
                };
                let result = yield scrap_service_1.ScrapService.list({}, query);
                return res.status(_httpStatus_1._httpStatusService.status.OK)
                    .json({
                    status: _httpStatus_1._httpStatusService.status.OK,
                    message: "Scrap Details fetched successfully",
                    data: result
                });
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
    getScrapDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _id = req.params;
                let thisId = new mongoose_1.default.Types.ObjectId(_id);
                let result = yield scrap_service_1.ScrapService.findOne({ _id: thisId });
                return res.status(_httpStatus_1._httpStatusService.status.OK)
                    .json({
                    message: "Details Fetched Succesfully",
                    data: result
                });
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
    scrapDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { scrapIds } = req.body;
                scrapIds.map((id) => __awaiter(this, void 0, void 0, function* () {
                    yield scrap_service_1.ScrapService.delete({ _id: id });
                }));
                let obj = {
                    "status": 200,
                    "message": "Scrap delete successfully !",
                };
                return res.status(_httpStatus_1._httpStatusService.status.OK)
                    .json(obj);
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
}
exports.UserController = new userController();
//# sourceMappingURL=user.controller.js.map