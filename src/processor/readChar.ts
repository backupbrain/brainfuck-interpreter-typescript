import * as readline from "readline";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const readChar = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    rl.question("Input: ", (answer) => {
      let charCode = answer.charCodeAt(0);
      // convert "newline" to `0`
      if (isNaN(charCode)) {
        charCode = 0;
      }
      resolve(charCode);
    });
  });
};
