import { required } from "./utils";

export type ConfigurationType = {
  port: number;
  database: {
    host: string;
    port: number;
    db: string;
    name: string;
    password: string;
  };
};

export default (): ConfigurationType => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    host: required(process.env.DATABASE_HOST),
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    db: required(process.env.DATABASE_DB),
    name: required(process.env.DATABASE_NAME),
    password: process.env.DATABASE_PASSWORD,
  },
});
