#!/usr/bin/env node
require("dotenv").config();
const funcs = ["download", "fetch-data", "truncate"];

const main = async () => {
  const arg = process.argv.slice(2);
  if (!!arg[0] && funcs.includes(arg[0])) {
    switch (arg[0]) {
      case "download":
        console.log('foo')
        const { download } = require("./gDriveDownload");
        await download();
        break;
      case "fetch-data":
        if (!!arg[1] && !!arg[2]) {
          const [begin, end] = arg.slice(1).map((x) => Number(x));
          const { fetchData } = require("./sequelizeHelper");
          await fetchData(begin, end);
        }
        break;
      case "truncate":
        const { truncate } = require("./sequelizeHelper");
        await truncate();
        break;
    }
  }
};
main();
