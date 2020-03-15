const jwt = require('jsonwebtoken');
const configs = require('../../configs');
module.exports = route => {
  route.post('/token', async (req, res) => {
    try {
      const reqRefreshToken = req.body.refreshToken;
      if (!reqRefreshToken) return res.sendStatus(403);
      // Verify the token
      await jwt.verify(reqRefreshToken, configs.app.REFRESH_SECRET_TOKEN);

      // This will execute if the refresh token is valid
      const token = await jwt.sign(
        { user: req.session.user },
        configs.app.SECRET_TOKEN,
        configs.app.SECRET_TOKEN_OPT
      );

      const refreshToken = await jwt.sign(
        { user: req.session.user },
        configs.app.REFRESH_SECRET_TOKEN,
        configs.app.REFRESH_SECRET_OPT
      );
      res.json({ token, refreshToken });
    } catch (error) {
      return res.sendStatus(403);
    }
  });
};
