const connectDB = require("./utils/db");
const app = require("./app");

const PORT = 3000 || 3001;

connectDB();

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Started Express app on http://localhost:${PORT}`);
});
