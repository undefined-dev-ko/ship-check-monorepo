import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";

type EnvName =
  | "PORT"
  | "NODE_ENV"
  | "SECRET"
  | "GOOGLE_CLIENT_ID"
  | "GOOGLE_CLIENT_SECRET"
  | "GOOGLE_REDIRECT_URL";

// https://medium.com/@datails/nestjs-keep-it-simple-stupid-4101d8bdf59c 참고
@Injectable()
export class ConfigService {
  private environments: Record<string, any>;
  constructor() {
    dotenv.config({ path: ".env" });
  }

  private get(envName: EnvName, required = false) {
    const value = process.env[envName] || "";
    required &&
      !value &&
      (() => {
        throw new Error(`the env '${envName}' should not be undefined`);
      })();
    return value;
  }

  getNodeEnv(): string {
    return this.get("NODE_ENV") || "dev";
  }

  getPort() {
    return parseInt(this.get("PORT"), 10) || 8080;
  }

  getGoogleAuthConfig() {
    return {
      clientId: this.get("GOOGLE_CLIENT_ID", true),
      clientSecret: this.get("GOOGLE_CLIENT_SECRET", true),
      redirectUri: this.get("GOOGLE_REDIRECT_URL", true),
    };
  }
}
