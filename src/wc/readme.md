# Challenge 1 - Write your own wc tool

This challenge corresponds to the first part of the Coding Challenges series by John Crickett https://codingchallenges.fyi/challenges/challenge-wc.

## Description

The WC tool is written in `index.js` file and it is the command line version of the tool. The tool is used to count the number of words, lines, bytes and characters in a file/stdin. The file is located in `src/wc`.

## Usage

You can use `node` to run the tool as follows:

```bash
node src/wc/index.js [option] filename
```

The following options are supported:

- `-w`: Display the number of words in the file.
- `-l`: Display the number of lines in the file.
- `-c`: Display the file size in bytes.
- `-m`: Display the number of characters in the file.
- No option: Display the number of lines, words, and file size in bytes.

The tool can also be used in stdin mode as follows:

```bash
cat filename | node src/wc/index.js [option]
```