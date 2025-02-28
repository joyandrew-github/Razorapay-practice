import { instance } from "../server.js";
import crypto from "crypto";

export const processPayment = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), 
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY, 
  });
};

export const paymentVerification = (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required Razorpay parameters",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET) 
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return res.redirect(
        `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
