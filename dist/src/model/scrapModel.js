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
exports.scrapModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require("dotenv/config");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default);
let schema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null
    },
    companyName: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    logo: {
        type: String,
        default: null
    },
    facebook: {
        type: String,
        default: null
    },
    linkedin: {
        type: String,
        default: null
    },
    twitter: {
        type: String,
        default: null
    },
    instagram: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    emails: {
        type: Array,
        default: null
    },
    webUrl: {
        type: String,
        default: null
    },
    screenshot: {
        type: String,
        default: null
    },
}, { timestamps: true });
schema.plugin(mongoose_paginate_v2_1.default);
schema.plugin(mongoose_aggregate_paginate_v2_1.default);
schema.plugin(AutoIncrement, { inc_field: "scrap_id" });
exports.scrapModel = (0, mongoose_1.model)('scrap', schema);
//# sourceMappingURL=scrapModel.js.map