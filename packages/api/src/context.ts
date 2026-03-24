import type { NextRequest } from "next/server";

export type Context = {
  req: NextRequest;
};

export function createContext(req: NextRequest): Context {
  return {
    req,
  };
}
