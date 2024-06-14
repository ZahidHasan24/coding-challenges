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
      fileSizeInBytes,
      lineCount: lines.length,
      wordCount: words.length,
      charCount: chars.length,
    };
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
};

const readFromStdin = async (stream) => {
  let content = "";
  stream.setEncoding("utf8");

  for await (const chunk of stream) {
    content += chunk;
  }

  return content;
};

const displayUsage = () => {
  console.log("Usage: -c|-l|-w|-m <file>");
};

const validateAndExtractArgs = (argv) => {
  if (argv.length === 0 || argv.length > 4) {
    displayUsage();
    process.exit(1);
  }
};

const getFilePathAndOption = (argv) => {
  const args = argv.slice(2);

  let option =
    args.length === 2 ? args[0] : args.length === 1 ? args[0] : "-default";
  let filePath =
    args.length === 2 ? args[1] : args.length === 1 ? argv[1] : args[0];

  return {
    option,
    filePath,
  };
};

const checkFileExistOrNot = async (filePath) => {
  try {
    await fs.accessSync(filePath);
  } catch {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
};

const printFileStatsBasedOnOption = (filePath, option, fileStats) => {
  const { fileSizeInBytes, lineCount, wordCount, charCount } = fileStats;

  switch (option) {
    case "-c":
      console.log(`${fileSizeInBytes} ${path.basename(filePath)}`);
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
        `${lineCount} ${wordCount} ${fileSizeInBytes} ${path.basename(
          filePath
        )}`
      );
      break;
    default:
      displayUsage();
      process.exit(1);
  }
};

const main = async (argv, stream) => {
  const isThereStream = !stream.isTTY;
  if (isThereStream) {
    try {
      const fileContent = await readFromStdin(stream);
      const lines = fileContent.split("\n");
      const words = fileContent.split(/\s+/).filter(Boolean);
      const chars = [...fileContent];

      const { option, filePath } = getFilePathAndOption(argv);
      console.log(filePath);
      const fileStats = {
        fileSizeInBytes: Buffer.byteLength(fileContent),
        lineCount: lines.length,
        wordCount: words.length,
        charCount: chars.length,
      };
      printFileStatsBasedOnOption(filePath, option, fileStats);
    } catch (err) {
      if (!(err instanceof TypeError)) {
        throw err;
      }
    }
  } else {
    validateAndExtractArgs(argv);
    const { option, filePath } = getFilePathAndOption(argv);
    await checkFileExistOrNot(filePath);
    const fileStats = await getFileStats(filePath);
    printFileStatsBasedOnOption(filePath, option, fileStats);
    if (typeof stream === "undefined") {
      throw new Error("Invalid file");
    }
  }
};

await main(process.argv, process.stdin);
