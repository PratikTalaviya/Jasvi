const { sendResponse } = require("../../../functions/sendRes");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../../../model/Payment");

exports.payment = async (req, res) => {
  const { currency } = req.body
  try {
    const instant = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    })
    if (currency === "INR") {
      const option = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      }
      instant.orders.create(option, (error, order) => {
        if (error) {
          return res.json({ message: "something wrong" })
        }
        res.json({ data: order, Success: 1 });
      })
    } else {
      const option = {
        amount: req.body.amount * 100,
        currency: "USD",
        receipt: crypto.randomBytes(10).toString("hex"),
      }
      instant.orders.create(option, (error, order) => {
        if (error) {
          return res.json({ message: "something wrong" })
        }
        res.json({ data: order, Success: 1 });
      })
    }

  } catch (error) {
    console.log("errr", error.message)
    sendResponse(res, 400, { message: error.message, Success: 0 });

  }
}
exports.verify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      let userid = req?.user?._id;
      const savepayment = new Payment({ payment_id: razorpay_payment_id, user_id: userid })
      const savedata = await savepayment.save()
      return res.send({ Success: 1, Message: 'Payment Verify Successfully!', paymentid: razorpay_payment_id });
    }
    else {
      return res.json({ Success: 0, Message: "Invalid" })
    }
  } catch (error) {
    sendResponse(res, 400, { message: error.message })
  }
}


