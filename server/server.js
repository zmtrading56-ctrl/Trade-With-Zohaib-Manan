const express = require("express");
const cors = require("cors");
const history = require("./history");
const routes = require("./routes");
const marketRoutes = require("./market");
const signal = require("./signal");
const newsService = require("./newsService");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);
app.use("/api", marketRoutes);
app.use("/api", signal);
app.use("/api", newsService);
app.use("/api", history);

// Home Route
app.get("/", (req, res) => {
  res.json({
    status: "Running",
    platform: "Trade With Zohaib Manan",
    version: "1.0.0",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});