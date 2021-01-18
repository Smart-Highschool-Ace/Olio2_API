import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
