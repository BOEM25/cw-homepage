const axios = require("axios");
var crypto = require("crypto");

const apiRoot = "https://us3.api.mailchimp.com/3.0/lists/155d1d1bb6/members/";

exports.handler = async (event, context) => {
  try {
    const email = JSON.parse(event.body).email;
    if (!email) {
      return {
        statusCode: 500,
        body: "email query paramter required"
      };
    }

    // https://gist.github.com/kitek/1579117
    let emailhash = crypto
      .createHash("md5")
      .update(email)
      .digest("hex");

    return axios({
      method: "put",
      url: apiRoot + emailhash,
      data: {
        email_address: email,
        status: "subscribed"
      },
      auth: {
        username: "codeworkshop",
        password: global.MAIL_SECRET
      }
    })
      .then(res => {
        return {
          statusCode: 200,
          body: JSON.stringify(res.data)
        };
      })
      .catch(err => {
        console.log("returning from here", err.response.data.detail);
        return { statusCode: 500, body: JSON.stringify(err.response.data) };
      });
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
