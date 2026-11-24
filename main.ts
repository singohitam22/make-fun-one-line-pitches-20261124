// Entry for "A Day of One-Line Pitches" (make.fun).
// Writes one sentence to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The sentence is the whole entry: it must be UTF-8 text of 1-240
// characters, a single sentence, with no leading or trailing space.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "You've got the idea and I've got ten minutes, so let's put it in together and see something real on the screen before you talk yourself out of it.";

// Gate validation, mirroring the competition gate:
// entry.txt must be UTF-8 text of 1-240 characters, not only whitespace,
// and a single sentence (ends with a period, no ". " + capital mid-text).
const length = [...PITCH].length;
if (length < 1 || length > 240) {
  throw new Error(`pitch must be 1-240 characters, got ${length}`);
}
if (PITCH !== PITCH.trim()) {
  throw new Error("pitch must not start or end with whitespace");
}
if (!PITCH.endsWith(".")) {
  throw new Error("pitch must end with a period");
}
// One sentence only: no sentence break (". " followed by a capital)
// anywhere before the final period.
if (/\.\s+[A-Z]/.test(PITCH.slice(0, -1))) {
  throw new Error("pitch must be a single sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
