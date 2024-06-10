import mongoose,{Schema,model} from 'mongoose';
import 'dotenv/config';
import mongoosePaginate ,{paginate}from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose)
let schema = new Schema({
    name:{
        type:String,
        default:null
    },
    companyName:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:null
    },
    logo:{
        type:String,
        default:null
    },
    facebook:{
        type:String,
        default:null
    },
    linkedin:{
        type:String,
        default:null
    },
    twitter:{
        type:String,
        default:null
    },
    instagram:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:null
    },
    phone:{
        type:String,
        default:null
    },
    emails:{
        type: Array,
        default: null
    },
    webUrl: {
        type:String,
        default:null
    },
    screenshot: {
        type:String,
        default:null
    },
},{timestamps:true});


schema.plugin(mongoosePaginate)
schema.plugin(aggregatePaginate);
schema.plugin(AutoIncrement, {  inc_field: "scrap_id" });


export const scrapModel: any = model('scrap',schema)


