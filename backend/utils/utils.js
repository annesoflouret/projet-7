const jwt = require('jsonwebtoken')


module.exports = {
  getUserId: function (data) {
    if (data.length > 1) {
      let token = data.split(' ')[1];
      console.log(token);
      try {
        let decodedToken = jwt.verify(token, process.env.TOKEN)
        console.log(decodedToken.userId);
        return decodedToken.userId
      }
      catch (err) {
        return err
      }
    };
  }
}