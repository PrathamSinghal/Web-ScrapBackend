import { error } from 'winston';
import { Response, Request, json } from 'express';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();
import moment from 'moment';
import axios from 'axios';
import EventEmitter from 'events';

import { enumType, resObj } from '../../utils/responseMessage';
import { _httpStatusService } from '../../utils/_httpStatus';
import {languagesMessage, languagesMsgFunc} from '../../utils/localisation';
import puppeteer from 'puppeteer';

import { ScrapService } from "../../services/scrap.service";


class userController {

    constructor() {

    }

    async scrapData(req:Request,res:Response) {
        try {
            let { webUrl } = req.body;
            console.log(webUrl,"webUrl");
            // Launch the browser and open a new blank page
            const browser = await puppeteer.launch({
                executablePath: '/usr/bin/chromium-browser',
                args: [ '--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote' ]
            });
            const page = await browser.newPage();
          
            // Navigate the page to a URL
            await page.goto(webUrl);


            const data:any = await page.evaluate(() => {
                const getMetaTagContent = (name) => {
                    const meta = document.querySelector(`meta[name="${name}"]`);
                    return meta ? meta.getAttribute('content') : null;
                };
        
                const getLinkHref = (selector) => {
                    const link = document.querySelector(selector);
                    return link ? link?.href : null;
                };
                const getLinkHrefEmail = (selector) => {
                    const link = document.querySelector(selector);
                    return link ? [link?.href.split(':')[1]] : null;
                };
        
                const getPhoneHref = (selector) => {
                    const link = document.querySelector(selector);
                    return link?.innerText ? link?.href.split(':')[1] : null;
                };
        
                const getImageSrc = (selector) => {
                    const img = document.querySelector(selector);
                    return img ? img.src : null;
                };
        
                const getEmails = () => {
                    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/g;
                    const bodyText = document?.body?.innerText;
                    const emails = bodyText?.match(emailRegex);
                    return emails ? [...new Set(emails)] : null;
                };

                const getAddress = () => {
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
                        const element:any = document.querySelector(selector);
                        if (element) {
                            return element?.innerText?.trim();
                        }
                    }
        
                    return null;
                };

                const getCompanyName = () => {
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
                        const element:any = document.querySelector(selector);
                        if (element) {
                            return element.content ? element.content : element.innerText?.trim();
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
                        const element:any = document.querySelector(selector);
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

            let screenshot = await page.screenshot({
                fullPage: true
            });
              console.log(screenshot,"screenshot");

              const base64String = Buffer.from(screenshot).toString("base64");

        
            console.log(data);

            let scrapData = {
                ...data,
                webUrl: webUrl,
                screenshot: base64String
            }

            let dataScrap = await ScrapService.create(scrapData);



            await browser.close();
            return res.status(200).json({
                data: dataScrap,
                message: "Website Data Saved"
            })
        


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
          
            


        } catch (error) {
            console.log(error,"err")
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }
    }

    async scrapList(req:Request,res:Response) {

        try {
            let querys: any = req.query;
    
            let query = {
                page: parseInt(querys.page) || 1,
                limit: parseInt(querys.limit) || 10,
            }
    
            let result = await ScrapService.list({ }, query)
            return res.status(_httpStatusService.status.OK)
            .json({
                status:_httpStatusService.status.OK,
                message:"Scrap Details fetched successfully",
                data:result
            })

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }

    async getScrapDetails(req:Request,res:Response) {

        try {
            let _id: any = req.params;

            let thisId = new mongoose.Types.ObjectId(_id);

            let result = await ScrapService.findOne({ _id: thisId });
            return res.status(_httpStatusService.status.OK)
                .json({
                    message: "Details Fetched Succesfully",
                    data: result
                })

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }

    async scrapDelete(req:Request,res:Response) {

        try {
            let { scrapIds } = req.body;
    
            scrapIds.map(async (id:any) => {
                await ScrapService.delete({ _id: id });
            })
    
            let obj = {
                "status": 200,
                "message": "Scrap delete successfully !",
            }
            return res.status(_httpStatusService.status.OK)
                    .json(obj)

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }


}


export const UserController = new userController()


