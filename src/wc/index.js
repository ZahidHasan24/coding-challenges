import fs from "fs";
import path from "path";

const getFileStats = async (filePath) => {
  try {
    const stats = await fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileContent = await fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n");
    const words = fileContent.split(/\s+/).filter(Boolean);
    const chars = [...fileContent];

    return {
      byteCount: fileSizeInBytes,
      lineCount: lines.length,
      wordCount: words.length,
      charCount: chars.length,
    };
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
};

const displayUsage = () => {
  console.log("Usage: -c|-l|-w|-m <file>");
};

const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.length > 2) {
    displayUsage();
    process.exit(1);
  }

  const option = args.length === 2 ? args[0] : "-default";
  const filePath = args.length === 2 ? args[1] : args[0];

  try {
    await fs.accessSync(filePath);
  } catch {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const { byteCount, lineCount, wordCount, charCount } = await getFileStats(
    filePath
  );

  switch (option) {
    case "-c":
      console.log(`${byteCount} ${path.basename(filePath)}`);
      break;
    case "-l":
      console.log(`${lineCount} ${path.basename(filePath)}`);
      break;
    case "-w":
      console.log(`${wordCount} ${path.basename(filePath)}`);
      break;
    case "-m":
      console.log(`${charCount} ${path.basename(filePath)}`);
      break;
    case "-default":
      console.log(
        `${lineCount} ${wordCount} ${byteCount} ${path.basename(filePath)}`
      );
      break;
    default:
      displayUsage();
      process.exit(1);
  }
};

main();
