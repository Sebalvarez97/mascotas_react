"use strict";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const environment = {
  port: process.env.SERVER_PORT || "4200",
  backendUrl: process.env.BACKEND_URL || "http://localhost:8080"
}
