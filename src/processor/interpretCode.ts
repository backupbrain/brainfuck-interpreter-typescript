import { openFile } from "./openFile";
import { readChar } from "./readChar";

// https://en.wikipedia.org/wiki/Brainfuck#Array_size
export const memoryLength = 30000;

export const memory = new Uint8Array(memoryLength).fill(0);
let pointerPosition = 0;

export const interpretCode = async (file: string) => {
  let code = await openFile(file);
  const loopStack: number[] = [];
  const loopEnds: number[] = [];
  const chars = [...code];
  for (let charPos = 0; charPos < chars.length; charPos++) {
    const char = chars[charPos];
    switch (char) {
      case ">":
        pointerPosition++;
        if (pointerPosition >= memoryLength) {
          throw new Error("Out of memory");
        }
        break;
      case "<":
        pointerPosition--;
        if (pointerPosition < 0) {
          throw new Error("Invalid memory position");
        }
        break;
      case "+":
        if (memory[pointerPosition] === 255) {
          memory[pointerPosition] = 0;
        } else {
          memory[pointerPosition]++;
        }
        break;
      case "-":
        if (memory[pointerPosition] === 0) {
          memory[pointerPosition] = 255;
        } else {
          memory[pointerPosition]--;
        }
        break;
      case ".":
        const memoryChar = String.fromCharCode(memory[pointerPosition]);
        process.stdout.write(memoryChar);
        break;
      case ",":
        memory[pointerPosition] = await readChar();
        break;
      case "[":
        if (memory[pointerPosition] !== 0) {
          // push the position of the loop start to the stack
          loopStack.push(charPos);
        } else {
          const loopEnd = loopEnds.pop();
          if (!loopEnd) {
            throw new Error("No matching ] found");
          }
          charPos = loopEnd;
        }
        break;
      case "]":
        if (loopStack.length === 0) {
          throw new Error("Invalid loop: no matching [ found");
        }
        const loopStart = loopStack.pop();
        if (loopStart === undefined) {
          throw new Error("Invalid loop: no matching [ found");
        }
        loopEnds.push(charPos);
        charPos = loopStart - 1;
        break;
      default:
        break;
    }
  }
};
