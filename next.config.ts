import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.0.199",
    "192.168.0.199:3003",
    "localhost",
    "localhost:3003",
    "railroad-duckling-ramp.ngrok-free.dev",
    "sacrament-chosen-pulp.ngrok-free.dev",
    "*.ngrok-free.dev",
    "silly-rats-cross.loca.lt",
    "dry-bottles-wonder.loca.lt",
    "*.loca.lt"
  ],
};

export default nextConfig;
