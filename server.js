const express = require("express");
const { initDb } = require("./db/connect");

const contactsRoutes = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/contacts", contactsRoutes);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });