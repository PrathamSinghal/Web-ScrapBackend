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
Object.defineProperty(exports, "__esModule", { value: true });
exports._infoMessaage = exports.resObj = exports.enumType = void 0;
const _httpStatus_1 = require("./_httpStatus");
const messages = __importStar(require("./message"));
;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.enumType = {
    language: {
        English: "en",
        Korean: "ko",
        Spanish: "es",
        Chinese: "zh"
    },
};
exports.resObj = {
    success: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.OK,
            message: `${value}  list successfully !`,
            data: data
        };
        return resObj;
    },
    create: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.OK,
            message: `${value} create successfully !`,
            data: data
        };
        return resObj;
    },
    login: (data, token, result, driverApproved) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.OK,
            message: messages.message.Login,
            token: {
                accessToken: token
            },
            data: data,
            result: result,
            driverApproved: driverApproved
        };
        return resObj;
    },
    error: (value) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.serverError,
            message: `${value === null || value === void 0 ? void 0 : value.message}` || 'Server error !',
        };
        return resObj;
    },
    list: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `${value} list successfully !`,
            data,
        };
        return resObj;
    },
    details: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `${value} Details successfully !`,
            data
        };
        return resObj;
    },
    signupSuccess: () => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            messages: "Successfully added detail"
        };
        return resObj;
    },
    deleteObj: (data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `delete successfully !`,
            data
        };
        return resObj;
    },
    blockObj: (data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `block successfully !`,
            data
        };
        return resObj;
    },
    singUp: (data) => {
        return {
            status: _httpStatus_1._httpStatusService.status.success,
            message: messages.message.OTP_SENT,
        };
    },
    forgetPassword: (data) => {
        return {
            status: _httpStatus_1._httpStatusService.status.success,
            message: messages.message.OTP_SENT,
        };
    },
    update: (value, data) => {
        return {
            status: _httpStatus_1._httpStatusService.status.OK,
            messages: `${value} update successfully !`,
            message: `${value} update successfully !`,
            data: data
        };
    },
    pageNotFound: (url) => {
        return {
            status: _httpStatus_1._httpStatusService.status.NotFound,
            message: "Page not found",
            url: url
        };
    },
    InvalidJson: (message) => {
        return {
            status: _httpStatus_1._httpStatusService.status.badRequest,
            message: message || "Invalid Payload JSON "
        };
    },
    logOut: {
        status: _httpStatus_1._httpStatusService.status.success,
        messages: "Logout Successfully",
        message: "Logout Successfully"
    },
    passwordChange: {
        status: _httpStatus_1._httpStatusService.status.success,
        messages: "Successfully Password changed",
    },
    resetPassword: {
        status: _httpStatus_1._httpStatusService.status.success,
        messages: "Successfully reset your password"
    },
    documentUpload: (data) => {
        return {
            status: _httpStatus_1._httpStatusService.status.success,
            message: "Successfully Document upload",
            data: data
        };
    }
};
exports._infoMessaage = {
    required: (value) => {
        return `This field is required`;
    },
    unique: (value) => {
        return `${value} already exists`;
    },
    minLength: (min) => {
        return `minimum ${min} characters`;
    },
    Invalid: (value) => {
        return `${value} is invalid`;
    },
    emailNotRegex: (value) => {
        return `${value} is not exist`;
    },
    passwordMatch: "Invalid user credentials",
    lowercase: 'one latter must be lowercase',
    uppercase: 'one latter must be uppercase',
    number: 'one latter must be number',
    alphanumeric: 'one latter must be alphanumeric',
    confirmPassword: 'Password and confirmPassword not match',
    blockedUser: 'Your account has been blocked,   contact admin',
    NotFoundUser: 'User is not found',
    invalidId: (value) => {
        return "  enter a valid " + value;
    }
};
//# sourceMappingURL=responseMessage.js.map