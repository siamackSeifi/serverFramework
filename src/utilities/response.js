const messages = {
    success: {
        responseCode: 200,
        lang: {
            en: "operation was successful",
            fa: "عملیات با موفقیت انجام شد",
        }
    },
    validationError: {
        responseCode: 422,
        lang: {
            en: "invalid input",
            fa: "داده ورودی نامعتبر"
        }
    },
    internalServerError: {
        responseCode: 500,
        lang: {
            en: "something went wrong. please try again later!",
            fa: "مشکلی پیش آمده. لطفا دقایقی دیگر مجددا تلاش کنید!"
        }
    },
    unauthorizedUser: {
        responseCode: 401,
        lang: {
            en: "Invalid token",
            fa: "توکن ارسالی نامعتبر است"
        }
    },
    inactiveUser: {
        responseCode: 401,
        lang: {
            en: "Inactive user",
            fa: "کاربر غیرفعال است"
        }
    },
    userNotExist: {
        responseCode: 404,
        lang: {
            en: "test",
            fa: "تست",
        }
    },
    userAlreadyExist: {
        responseCode: 409,
        lang: {
            en: "",
            fa: "",
        }
    }
}

exports.responseGenerator = (req, res, status = 'success', data = null, customMessage = null) => {
    let response = {};
    let message = (messages[status] !== undefined) ? messages[status] : messages.internalServerError;
    response.responseCode = message.responseCode;
    response.message = customMessage || message.lang[req.headers.language || 'en'];
    if (data)   response.data = data;
    return res.status(response.responseCode).json(response);
}
