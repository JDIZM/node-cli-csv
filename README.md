# node-cli-csv

An example project using vite-node and typescript to create a cli tool that ingests csv data and sorts it.

- [vite-node](https://github.com/vitest-dev/vitest/tree/main/packages/vite-node)
- [esbuild](https://esbuild.github.io/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [typescript](https://www.typescriptlang.org/)
- [vitest](https://vitest.dev/)

## Requirements

This project requires node.js to be installed. This project uses volta to manage node versions.

To install volta run the following command in the terminal.

```
curl https://get.volta.sh | bash
```

### ESM Node

https://www.typescriptlang.org/docs/handbook/esm-node.html

### Install

Build and install the package globally so you have access in your cli terminal.

1. build `npm run build`
2. install `npm install -g .`

Then test the package is working and installed by calling the package name `csv-picker` in your terminal.

The run command is `csv-picker -p ./src/input.csv -o ./src/output.csv` which will create a sorted csv file from an input csv file.

### Testing

This project uses [vitest](https://vitest.dev/) for testing.

1. run the unit tests with `npm run test`

It's also recommended to install the [vitest extension for vscode](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer).

### vite-node

When running the `npm run dev` command you need to prefix any arguments with `--`

eg `npm run dev -- -p ./src/input.csv -o ./src/output.csv`

### Running the cli

1. The input path and output path need to be provided
2. run `csv-picker --help` for a list of options
3. run the cli with arguments `csv-picker -p ./src/input.csv -o ./src/output.csv` to create a sorted csv file from an input csv file.
