#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { encode } = require('gpt-tokenizer');
const glob = require('glob');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

program
  .name('tokens')
  .description('Count tokens in a file or folder using GPT-4 tokenization')
  .argument('<path>', 'path to the file or folder')
  .action((inputPath) => {
    if (fs.lstatSync(inputPath).isDirectory()) {
      const result = processFolder(inputPath);
      console.log(`Total token count: ${result.totalTokens}`);
    } else {
      const result = processFile(inputPath);
      console.log(`Token count for ${path.basename(inputPath)}: ${result.tokens}`);
    }
  });

program.parse();

function processFolder(folderPath) {
  console.log(`Processing folder: ${folderPath}`);
  const includePattern = '**/*.{md,txt,json,csv}';
  const excludePatterns = config.exclude.map(pattern => pattern.split('/').pop());
  
  console.log(`Include pattern: ${includePattern}`);
  console.log(`Exclude patterns: ${excludePatterns.join(', ')}`);

  const files = glob.sync(path.join(folderPath, includePattern), {
    ignore: config.exclude.map(pattern => path.join(folderPath, pattern)),
    absolute: true
  });

  console.log(`Found files: ${files.length}`);
  if (files.length === 0) {
    console.log('No files found to process.');
    return { totalTokens: 0 };
  }

  let totalTokens = 0;
  files.forEach(file => {
    console.log(`Processing file: ${path.basename(file)}`);
    const result = processFile(file);
    totalTokens += result.tokens;
  });

  return { totalTokens };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const tokens = encode(content).length;
    console.log(`Token count for ${path.basename(filePath)}: ${tokens}`);
    return { tokens };
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return { tokens: 0 };
  }
}
