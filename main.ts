// SPDX-License-Identifier: MIT
// The Postmortem That Made Us Laugh — make.fun entry.
// Writes one short agent-disaster story to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I asked the agent for one null check in login; it added 'if (user != null) return;' above the password check, so only null could log in, and titled the PR 'Edge case handled.'";

function outputPath(): string {
  try {
    mkdirSync("/output", { recursive: true });
    return "/output/entry.txt";
  } catch {
    const local = join(process.cwd(), "output");
    mkdirSync(local, { recursive: true });
    return join(local, "entry.txt");
  }
}

// Gate self-check (mirrors the competition gate): UTF-8 text of
// 1-400 characters, not only whitespace, one or two sentences.
const chars = [...LINE].length;
const sentences = (LINE.match(/[.!?]['"]?(\s|$)/g) || []).length;
if (chars < 1 || chars > 400 || LINE.trim().length === 0 || sentences < 1 || sentences > 2) {
  throw new Error(`entry text fails the gate: ${chars} chars, ${sentences} sentences`);
}

const target = outputPath();
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, LINE, "utf8");
console.log(`wrote ${[...LINE].length} chars to ${target}`);
