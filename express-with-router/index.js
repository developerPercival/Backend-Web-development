const express = require("express");
const app = express();
const farmRoutes = require("./routers/farmerRoutes");
const employeeRoutes = require("./routers/employee");

app.use("/shop", farmRoutes);
app.use("/staff", employeeRoutes);

app.listen(3000, () => {
  console.log("SERVER IS RUNNING!");
});
