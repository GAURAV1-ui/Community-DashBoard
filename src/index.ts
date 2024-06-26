import express, { Express} from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser"
import connectToDatabase  from "./db/index";
import userRoutes from './routes/user.route'
import roleRoutes from './routes/role.route'
import communityRoutes from "./routes/community.route";
import memberRoutes from './routes/member.route';

dotenv.config({
    path: './.env'
});

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(userRoutes);
app.use(roleRoutes);
app.use(communityRoutes);
app.use(memberRoutes);

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.log("Database connection failed", error);
        process.exit();
    })


