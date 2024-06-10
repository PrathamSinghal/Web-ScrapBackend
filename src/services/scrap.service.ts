import mongoose from 'mongoose';
import * as db from '../model/_index';
import * as Interface from "../interface/scrap.interface";

class scrapService {
    constructor() {

    }

    async create(payload: Interface.scrap): Promise<any> {
        try {
            return await db.scrapModel.create(payload);
        } catch (error) {
            throw error
        }
    }

    async update(query: Object, payload: any): Promise<any> {
        try {
            return await db.scrapModel.findOneAndUpdate(query, payload, { new: true })
        } catch (error) {
            throw error
        }
    }

    async findOne(query: Object) {
        try {
            return await db.scrapModel.findOne(query)
        } catch (error) {
            throw error
        }
    }

    async aggregatePaginate(aggregate: any[], option: { page: Number, limit: Number }) {
        return new Promise(async (resolve, reject) => {
            try {
                var myAggregate = db.scrapModel.aggregate(aggregate);
                var data = await db.scrapModel.aggregatePaginate(myAggregate, option);
                resolve(data)
            } catch (error) {
                reject(error)
            }

        })
    }

    async list(query?: Object, options?: { page: Number, limit: Number }): Promise<any> {
        try {
            let filter: any = [
                { $sort: { _id: -1 } },
            ];
            return await this.aggregatePaginate(filter, options)
        } catch (error) {

        }
    }

    async delete(query:any) {
        try {
            return db.scrapModel.deleteOne(query, {isDelete:true})
        } catch (error) {
            throw error
        }
    }

}


export const ScrapService = new scrapService();