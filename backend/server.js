const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");
const userRouter = require("./router/userRoute");
const cartRouter = require("./router/cartRouter");
const adminRouter = require("./router/adminRouter");
const productRouter = require("./router/productRouter");
const connectCloudinary = require("./config/cloudinary");
const adminUserRouter = require("./router/adminUserRouter");
const orderRouter = require("./router/orderRouter");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Config Cloudinary
connectCloudinary();

// Middlewares
app.use(express.json());

app.use(cors({
    origin: "https://full-stack-admin-pied.vercel.app", 
    methods: ["POST", "GET"],
    credentials: true,
}));

app.get("/", async (req, res) => {
    res.send("API WORKING");
});

// Connecting DB
connectDB();

// Routes
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/admin", adminRouter);  
app.use("/admin/products", productRouter);
app.use("/admin/users", adminUserRouter);
app.use("/api/order", orderRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
