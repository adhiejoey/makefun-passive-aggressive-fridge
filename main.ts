// Notes From a Passive-Aggressive Fridge — make.fun entry.
// A smart fridge leaves one note on its door screen for its owner.
// The program writes that single note to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The note itself: dry, petty, specific. The fridge has been watching
// the leftovers since March, and they have had enough.
const NOTE =
  "Your leftovers from March have unionised. They have negotiated weekends off, and they no longer answer to 'dinner'.";

function main(): void {
  // The house gate: UTF-8 text, 1 to 200 characters, not only whitespace.
  const length = [...NOTE].length;
  if (length < 1 || length > 200) {
    throw new Error(`note must be 1-200 characters, got ${length}`);
  }
  if (NOTE.trim().length === 0) {
    throw new Error("note must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, NOTE, "utf8");
  console.log(`wrote ${target} (${length} chars)`);
}

main();
