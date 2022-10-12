import { program } from "commander";

export type ProcessArgumentsResult = {
  [key: string]: string;
};
export const processArguments = (): ProcessArgumentsResult => {
  program.name("brainfuck").description("Brainfuck interpreter");
  program.argument("<file>", "Brainfuck file to interpret");
  const args = program.parse();
  const file = args.processedArgs[0];
  console.log(`Interpreting ${file}`);
  console.log("");
  return { file };
};
