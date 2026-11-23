// Entry point for gta6-meme-x-01 bounty submission processor.
// This script copies the post metadata JSON to the designated output folder.

import { copyFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';

async function run(): Promise<void> {
  // MAKEFUN_BOT_DIR specifies where the input bot directory is located (defaulting to '/bot'),
  // while MAKEFUN_OUTPUT_DIR specifies where the output directory should be written (defaulting to '/output').
  const botPath = process.env.MAKEFUN_BOT_DIR ?? '/bot';
  const outPath = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

  await mkdir(outPath, { recursive: true });

  const sourceFile = join(botPath, 'POST.json');
  const targetFile = join(outPath, 'POST.json');

  // The copy step transfers the POST.json configuration file from the bot input directory
  // to the target output directory so that the judging harness can read the submission URL.
  await copyFile(sourceFile, targetFile);
}

run().catch((error: unknown) => {
  const msg = error instanceof Error ? error.message : String(error);
  console.error('Fatal execution error:', msg);
  // If any error occurs during directory creation or file copying, we log the error
  // and terminate with exit code 1 to signal failure to the harness runner.
  process.exit(1);
});
