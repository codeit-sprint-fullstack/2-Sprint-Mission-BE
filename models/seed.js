import * as dotenv from "dotenv";
dotenv.config();

// ...

mongoose.connect(process.env.DATABASE_URL);
