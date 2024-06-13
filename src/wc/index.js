import fs from "fs";
import path from "path";

const getByteCount = (filePath) => {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

const getLineCount = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const lines = fileContent.split("\n");
  return lines.length;
};

const displayUsage = () => {
  console.log("Usage: -c|-l <file>");
};

const main = () => {
  const args = process.argv.slice(2);

  if (args.length !== 2 || (args[0] !== "-c" && args[0] !== "-l")) {
    displayUsage();
    process.exit(1);
  }

  const filePath = args[1];
  const option = args[0];

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  if (option === "-c") {
    const byteCount = getByteCount(filePath);
    console.log(`${byteCount} ${path.basename(filePath)}`);
  } else if (option === "-l") {
    const lineCount = getLineCount(filePath);
    console.log(`${lineCount} ${path.basename(filePath)}`);
  } else {
    throw new Error("Invalid option");
  }
};

main();
