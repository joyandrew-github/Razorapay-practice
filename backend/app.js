// import express from "express";
// import paymentRoutes from "./routes/productRoutes.js"; 

// const app = express();
// app.use(express.json()); 
// app.use(express.urlencoded({extended:true}))
// app.use("/api/v1", paymentRoutes);
// app.use("/api/v1", payment);
// export default app;




import express from "express";
import paymentRoutes from "./routes/productRoutes.js"; // Importing routes

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", paymentRoutes);

export default app;
