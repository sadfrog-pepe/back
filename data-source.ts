import path from "path";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	password: "",
	database: "vintage",
	username: "root",
	entities: [
		path.join(__dirname, "src/entities/**/*.entity.ts"),
		path.join(__dirname, "dist/entities/**/*.entity.js"),
	],
	synchronize: true,
	logging: true,
});
