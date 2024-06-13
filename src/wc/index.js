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
const getWordCount = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const words = fileContent.split(/\s+/).filter(Boolean);
  return words.length;
};

const getCharCount = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return [...fileContent].length;
};

const displayUsage = () => {
  console.log("Usage: -c|-l|-w|-m <file>");
};

const main = () => {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.length > 2) {
    displayUsage();
    process.exit(1);
  }

  const option = args.length === 2 ? args[0] : "-default";
  const filePath = args.length === 2 ? args[1] : args[0];

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
  } else if (option === "-w") {
    const wordCount = getWordCount(filePath);
    console.log(`${wordCount} ${path.basename(filePath)}`);
  } else if (option === "-m") {
    const charCount = getCharCount(filePath);
    console.log(`${charCount} ${path.basename(filePath)}`);
  } else if (option === "-default") {
    const byteCount = getByteCount(filePath);
    const lineCount = getLineCount(filePath);
    const wordCount = getWordCount(filePath);
    console.log(
      `${lineCount} ${wordCount} ${byteCount} ${path.basename(filePath)}`
    );
  } else {
    throw new Error("Invalid option");
  }
};

main();
