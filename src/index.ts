#!/usr/bin/env node

import { exampleFunction } from "./exampleFunction";
import { version } from "../package.json";

// importing package json makes tsc bundle the /src folder
console.log("version", version);

exampleFunction("foo", "bar");

export * from "./exampleFunction";
