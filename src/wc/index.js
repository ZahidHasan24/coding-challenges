import fs from "fs";
import path from "path";

const getByteCount = (filePath) => {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

const displayUsage = () => {
  console.log("Usage: -c <file>");
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== "-c") {
    displayUsage();
    process.exit(1);
  }
  const filePath = args[1];
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  const byteCount = getByteCount(filePath);
  console.log(`${byteCount} ${path.basename(filePath)}`);
};

main();
