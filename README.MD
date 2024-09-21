# gpt-token-counter

A command-line tool to count tokens in files and folders using GPT-4 tokenization.

## Features

- Count tokens in individual files or entire directories
- Supports multiple file types: .md, .txt, .json, .csv
- Excludes common non-text files and directories
- Uses GPT-4 tokenization method
- No API key or internet connection required

## Installation

Install the package globally:

```sh
npm install -g gpt-token-counter
```

## Usage

You can use the command `tokens` to count tokens in a file or directory.

### Count Tokens in a File

```sh
tokens <path-to-file>
```

Example:

```sh
tokens /path/to/your/file.txt
```

### Count Tokens in a Directory

```sh
tokens <path-to-directory>
```

Example:

```sh
tokens /path/to/your/directory
```

### Adding Alias to zshrc

To make it easier to use, you can add an alias to your `~/.zshrc` file:

```sh
echo "alias 'tokens file'='tokens'" >> ~/.zshrc
source ~/.zshrc
```

Now you can use the command `tokens file <path>` to count tokens in any file.

## Configuration

The tool uses a `config.json` file to specify which file types to include and exclude. Here is an example configuration:

```json:config.json
{
  "include": ["**/*.md", "**/*.txt", "**/*.json", "**/*.csv"],
  "exclude": ["node_modules/**", "**/*.log", "**/*.pdf", "**/*.docx", "**/*.xlsx", "**/*.xls", "**/*.pptx", "**/*.ppt", "**/*.odt", "**/*.ods", "**/*.odp"]
}
```

## Example Output

```sh
tokens /path/to/your/directory
Processing folder: /path/to/your/directory
Include pattern: **/*.{md,txt,json,csv}
Exclude patterns: node_modules, log, pdf, docx, xlsx, xls, pptx, ppt, odt, ods, odp
Found files: 3
Processing file: example-file-1.json
Token count for example-file-1.json: 37857
Processing file: example-file-2.json
Token count for example-file-2.json: 379634
Processing file: example-file-3.json
Token count for example-file-3.json: 10039
Total token count: 427530
```

## Author

[developerisnow](https://www.npmjs.com/~developerisnow)

## License

This project is licensed under the ISC License.
