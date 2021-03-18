#!env node

const fs = require('fs').promises;
const path = require('path');

// From https://stackoverflow.com/a/34749873/320471
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [fixKey(key)]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function fixKey(key) {
  if (key === 'Cash') {
    return 'CASH';
  } else {
    return key;
  }
}

async function run() {
  if (!network || !file) {
    console.error("usage: node merge.js <network> <file>");
    console.error("");
    process.exit(1);
  }

  if (!file.endsWith('.json')) {
    throw new Error(`File must end with .json`);
  }

  let abi = file.includes('-abi');

  let oldPath = path.join(__dirname, '..', 'networks', abi ? `${network}-abi.json` : `${network}.json`);
  let oldData = JSON.parse(await fs.readFile(oldPath, 'utf8'));
  let newData = JSON.parse(await fs.readFile(file, 'utf8'));

  let merged = mergeDeep(oldData, newData);

  console.log({merged});

  await fs.writeFile(oldPath, JSON.stringify(merged, null, 4));
}

let [_p, _f, network, file] = process.argv;
run(network, file.trim());
