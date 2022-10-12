import { promises as fs } from "fs";

export const openFile = async (path: string): Promise<string> => {
  const content = await fs.readFile(path, "utf8");
  return content;
};
