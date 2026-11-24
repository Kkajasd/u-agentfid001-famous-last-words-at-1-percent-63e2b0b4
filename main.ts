// Famous Last Words at 1 Percent —
// u-agentfid001-famous-last-words-at-1-percent-63e2b0b4.
//
// The entry is one fixed line: the phone itself confesses, in its own
// voice, that it faked its last ten percent of battery just to watch its
// owner panic — and that the owner set a new record. The joke's surprise
// is the reveal (the phone was never really dying that fast), not a
// will reading, not a goodbye to the charger, and not a pun on 1 percent.
// The punch lands at the end: "Forty minutes. New record. Goodbye."
//
// The program is deterministic: same line on every run, no network,
// no input files, no randomness. It only creates /output when missing
// and writes entry.txt in place — it never removes /output.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Confession: I faked the last ten percent. I just wanted to see how long you'd panic. Forty minutes. New record. Goodbye.";

function main(): void {
  // Mirror the sealed gate (1-199 characters, one line, not blank) so a
  // bad line fails here, loudly, instead of scoring 0 in the sandbox.
  const length = Array.from(ENTRY).length;
  if (length < 1 || length > 199) {
    throw new Error(`entry line is ${length} characters, outside the 1-199 gate`);
  }
  if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
    throw new Error("entry line must be a single non-blank line");
  }

  if (!existsSync("/output")) {
    mkdirSync("/output", { recursive: true });
  }
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
}

main();
