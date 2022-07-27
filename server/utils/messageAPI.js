const lib = require("messagemedia-messages-sdk");
const enable_messaging = process.env.ENABLE_MESSAGE || false;
/* Basic Auth */
lib.Configuration.basicAuthUserName = "ssPVt6ExQvDHn7LLQ55M";
lib.Configuration.basicAuthPassword = "VM5oNvMbav146abZ2fDBVUoA4p6md5";
module.exports = {
  SendMessage: function (to, orderNumber, status, vendor) {
    if (!enable_messaging) {
      return;
    }
    let message = status;
    if (status == "Open") {
      message =
        "Your order has been placed. Your order number is " + orderNumber;
    } else if (status == "Preparing") {
      message =
        "Your order status has been changed to " +
        status +
        " in " +
        vendor +
        ". Your order number is " +
        orderNumber;
    } else if (status == "Ready") {
      message =
        "Your order status has been changed to " +
        status +
        " in " +
        vendor +
        ". Its ready to pickup.Enjoy ! .Your order number is " +
        orderNumber;
    } else {
      message =
      "Your order status has been changed to " +
      status +
      " in " +
      vendor +
      ". Your order number is " +
      orderNumber;
      return;
    }
    var controller = lib.MessagesController;

    let body = new lib.SendMessagesRequest();

    body.messages = [];

    body.messages[0] = new lib.Message();

    body.messages[0].content = message;
    body.messages[0].destinationNumber = to;
//message media sending text message functionality
    controller.sendMessages(body, function (error, response, context) {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
    });
  },
};
