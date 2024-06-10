

import {Router} from 'express';
import * as validations from '../validations/_index';
import * as controllers from '../controller/_index';
import {errorResponse} from '../middleware/validations-error.middleware';


const router:Router = Router();


// all books routes 
export  const userRoutes = [
    router.post('/scrapData',validations.user.scrapData,errorResponse,controllers.user.UserController.scrapData),
    router.get('/scrapList',controllers.user.UserController.scrapList),
    router.get('/getScrapDetails/:id',validations.user.fetchScrapData,errorResponse,controllers.user.UserController.getScrapDetails),
    router.post('/scrapDelete',controllers.user.UserController.scrapDelete),
];