const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db");
const userRoutes = require("./routes/users_route");
const gamesRoutes = require("./routes/games_route");
const consolesRoutes = require("./routes/consoles_route");
const remoteRoutes = require("./routes/remote_route");
const amdinRoutes = require("./routes/admin_route");
const purchaseRoutes = require("./routes/purchase_route");
const rentRoutes = require("./routes/rent_route");
const paymentRoute = require("./routes/payment_route");
const cors = require("cors");
const app = express();
const cookieparser = require("cookie-parser");

dotenv.config();

app.use(cors({
  origin: ["http://localhost:5173"], 
  credentials: true
}));


const PORT = process.env.PORT || 3000;

app.use(cookieparser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

ConnectDB();

app.use("/api/v1", userRoutes);
app.use("/api/v1", gamesRoutes);
app.use("/api/v1", consolesRoutes);
app.use("/api/v1", remoteRoutes);
app.use("/api/v1", amdinRoutes);
app.use("/api/v1", purchaseRoutes);
app.use("/api/v1", rentRoutes);

app.use("/api/v1", paymentRoute)



app.listen(PORT,()=>{
  console.log("Server is running on PORT", PORT);
});