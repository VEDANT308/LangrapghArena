import fs from "fs";

try {
  if (fs.existsSync("dist")) {
    console.log("Cleaning old dist/ build directory...");
    fs.rmSync("dist", { recursive: true, force: true });
    console.log("Successfully cleaned dist/ directory.");
  }
} catch (error) {
  console.error("Failed to clean dist directory:", error);
  process.exit(1);
}
