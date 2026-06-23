import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv';
import healthRouter from "./routes/health.routes.js";
import productRouter from './routes/product.routes.js';

const app = express();
configDotenv()
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
app.use("/api", productRouter);

app.use("/api", healthRouter);
app.use("/api", productRouter);