import path from "path";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || "vintage",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    entities: [
        path.join(__dirname, "src/entities/**/*.entity.ts"),
        path.join(__dirname, "dist/entities/**/*.entity.js"),
    ],
    synchronize: true,
    logging: true,
});
