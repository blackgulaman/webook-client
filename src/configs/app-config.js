// Application port
exports.port = process.env.PORT || 9000;

// Checker for what server is to run (http | https)
exports.isHttp = true;

exports.COOKIE_SECRET = 'w3b00k_Bl4ck6ul4m4n';

exports.EXPRESS_SID_KEY = '_webook_client';

exports.SECRET_TOKEN = 'adb9a7a3104dd6b9250019b60a1cb8a38dbe5af787876f5b54f7';
exports.REFRESH_SECRET_TOKEN = '0be1feac7b7472c13ac462e48e5842a577bd9dcc9aa';

exports.SECRET_TOKEN_OPT = { expiresIn: '10s' };
exports.REFRESH_SECRET_TOKEN_OPT = { expiresIn: '10h' };
