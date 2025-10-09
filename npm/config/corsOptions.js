const { useCallback } = require("react")

const whitelist = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500', 
    'http://localhost:3500']

    const corsOptions = {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }