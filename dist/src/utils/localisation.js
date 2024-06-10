"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languagesMsgFunc = exports.languagesMessage = exports.LanguageFunc = exports.languages = void 0;
exports.languages = {
    "en": {
        "SignUp": " OTP sent successfully",
        "otpVerify": "Registration successful",
        "login": "Logged in successfully",
        "otpSend": "OTP sent successfully",
        "mobileNumberAlreadyExist": "Mobile Number already exist",
        "emailAlreadyExist": "Email already exist",
        "acceptedRide": "Driver has accepted your ride ",
        "pickUpRide": "Driver is waiting at your pick-up location",
        "RideStarted": "Your ride has been started",
        "RideCompleted": "Your ride is completed successfully",
        "wrongOtp": "  Enter a valid OTP",
        "otpExpired": "OTP is expired. Resend it",
        "mobileNotExit": "Mobile Number not exist",
        "cancelRide": "Cancel ride",
        "updateMessage": "Successfully updated",
        "rateAndRiview": "Successfully updated review and rating",
        "userSignature": "Signature uploaded successfully",
        "Success": "Success",
        "gift_card_not_found": "Gift card is already redeemed",
        "invalid_promocode": "Promocode is invalid",
        "giftCardSend": "Gift Card Sent Successfully",
        "CardAdded": "Successful card details added",
        "Cashback": "Cashback",
        "bookingId": "Booking ID:",
        "SomethingWrong": "Something went wrong."
    },
    "ko": {
        "SignUp": "OTP가 성공적으로 전송 되었습니다",
        "otpVerify": "성공적으로 등록되 었습니다",
        "login": "로그인 성공",
        "otpSend": "OTP가 성공적으로 전송 되었습니다",
        "mobileNumberAlreadyExist": "이 번호는 이미 존재합니다.",
        "acceptedRide": "드라이버가 할당되었습니다.",
        "pickUpRide": "운전자가 위치에 도달했습니다.",
        "RideStarted": "여행 시작",
        "RideCompleted": "주행이 성공적으로 완료됨",
        "emailAlreadyExist": "이메일이 이미 존재합니다",
        "wrongOtp": " 올바른 OTP를 입력하십시오.",
        "otpExpired": "OTP가 만료되었습니다. 다시 보내주세요",
        "mobileNotExit": "휴대폰 번호가 없습니다",
        "cancelRide": "승차 취소",
        "updateMessage": "성공적으로 업데이트됨",
        "rateAndRiview": "리뷰 및 평가를 성공적으로 업데이트",
        "userSignature": "서명 업로드 성공",
        "Success": "성공",
        "gift_card_not_found": "기프트 카드가 이미 사용되었습니다.",
        "giftCardSend": "기프트 카드가 성공적으로 전송됨",
        "CardAdded": "성공한 카드 세부정보가 추가되었습니다.",
        "Cashback": "캐쉬백",
        "bookingId": "예약 ID:",
        "SomethingWrong": "문제가 발생했습니다.",
        "invalid_promocode": "프로모션 코드가 유효하지 않습니다.",
    },
    "es": {
        "SignUp": "Enviado con éxito",
        "otpVerify": "Firmaron con éxito",
        "login": "Logínense con éxito",
        "otpSend": "Enviado con éxito",
        "mobileNumberAlreadyExist": "Este número ya existe",
        "acceptedRide": "El conductor asignado con éxito",
        "pickUpRide": "El conductor llegó a su ubicación",
        "RideStarted": "El viaje comenzó",
        "RideCompleted": "El viaje terminó con éxito",
        "emailAlreadyExist": "Ya existe el correo electrónico",
        "wrongOtp": "Por favor entre un OTP válido",
        "otpExpired": "OTP ha caducado. por favor reenvialo",
        "mobileNotExit": "Ingrese el número de teléfono válido",
        "cancelRide": "cancelar viaje",
        "updateMessage": "Exitosa actualizada",
        "rateAndRiview": "actualizar con éxito la revisión y la calificación",
        "userSignature": "Carga de firma exitosa",
        "Success": "Éxito",
        "gift_card_not_found": "La tarjeta regalo ya está canjeada",
        "giftCardSend": "Tarjeta de regalo enviada con éxito",
        "CardAdded": "Detalles de tarjeta exitosos agregados",
        "Cashback": "Devolución de dinero",
        "bookingId": "Identificación de la reserva:",
        "SomethingWrong": "Algo salió mal.",
        "invalid_promocode": "El código promocional no es válido",
    },
    "zh": {
        "SignUp": "OTP成功發送",
        "otpVerify": "成功報名",
        "login": "成功登入",
        "otpSend": "OTP成功發送",
        "mobileNumberAlreadyExist": "這個號碼已經存在了",
        "acceptedRide": "成功分配驅動程序",
        "pickUpRide": "司機到達地點",
        "RideStarted": "行程開始了",
        "RideCompleted": "行程順利完成",
        "emailAlreadyExist": "电子邮件已经存在",
        "wrongOtp": "請輸入有效的OTP",
        "otpExpired": "OTP 已过期。请重新发送",
        "mobileNotExit": "请输入有效的电话号码",
        "cancelRide": "取消行程",
        "updateMessage": "更新成功",
        "rateAndRiview": "成功更新评论和评分",
        "userSignature": "签名上传成功",
        "Success": "成功",
        "gift_card_not_found": "礼品卡已兑换",
        "giftCardSend": "礼品卡发送成功",
        "CardAdded": "添加成功的卡详细信息",
        "Cashback": "返现",
        "bookingId": "预订编号：",
        "SomethingWrong": "出了些问题。",
        "invalid_promocode": "促销代码无效",
    }
};
exports.LanguageFunc = {
    "en": {
        CashbackReceived: (val) => {
            return "You have received " + val + " as a cashback";
        },
        mileagePointReceived: (val) => {
            return "You have received " + val + " mileage points";
        }
    },
    "ko": {
        CashbackReceived: (val) => {
            return "캐쉬백으로 " + val + "을 받았습니다.";
        },
        mileagePointReceived: (val) => {
            return val + "마일리지를 받으셨습니다.";
        }
    },
    "es": {
        CashbackReceived: (val) => {
            return "Has recibido " + val + " como cashback";
        },
        mileagePointReceived: (val) => {
            return "Ha recibido " + val + " puntos de millas";
        }
    },
    "zh": {
        CashbackReceived: (val) => {
            return "您已收到 " + val + " 作为现金返还";
        },
        mileagePointReceived: (val) => {
            return "您已获得 " + val + " 里程积分";
        }
    }
};
let languagesMessage = (lang, key) => {
    console.log(lang);
    if (!lang)
        return exports.languages["en"][key];
    console.log({ lang, key }, exports.languages[lang][key]);
    return exports.languages[lang][key];
};
exports.languagesMessage = languagesMessage;
let languagesMsgFunc = (lang) => {
    return exports.LanguageFunc[lang];
};
exports.languagesMsgFunc = languagesMsgFunc;
//# sourceMappingURL=localisation.js.map