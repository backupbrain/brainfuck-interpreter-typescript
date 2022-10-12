import { interpretCode } from "./processor/interpretCode";
import { processArguments } from "./processor/processArguments";

const { file } = processArguments();

interpretCode(file)
  .then(() => {
    console.log("");
    console.log("Done");
    return process.exit(0);
  })
  .catch((error) => {
    console.log("");
    console.log("Error:", error.message);
    return process.exit(1);
  });
