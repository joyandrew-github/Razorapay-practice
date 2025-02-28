// import express from "express";
// import { getKey, paymentVerification, processPayment } from "../controllers/productController.js"; // Importing controller

// const router = express.Router();

// router.post("/payment/process", processPayment); 
// router.post("/payment/process").post(processPayment); 
// router.route("/getKey").get(getKey);
// router.route("/paymentVerification").get(paymentVerification);
// export default router;


import express from "express";
import { getKey, paymentVerification, processPayment } from "../controllers/productController.js"; 

const router = express.Router();


router.post("/payment/process", processPayment);

router.route("/getKey").get(getKey);

router.route("/paymentVerification").post(paymentVerification);  

export default router;
