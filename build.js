import { readFile, readdir } from 'fs/promises';
import { chdir, cwd } from 'process';
import { execSync } from 'child_process';
import { createFolderHash } from './lib/create-hash.js';
import { getValidName } from './lib/get-valid-name.js';
import path from 'path';
import hasKey from './lib/has.js';
import { existsSync, readdirSync, renameSync, rmSync, writeFileSync } from 'fs';

const CURRENT_DIR = cwd();

const DATA_DIR = path.join(CURRENT_DIR, 'pages');

const HASH_FILE = path.join(CURRENT_DIR, '.hash.json');

const OUTPUT_DIR = path.join(CURRENT_DIR, 'rendered');

const currentHashMap = JSON.parse((await readFile(HASH_FILE)).toString());

const folders = await readdir(DATA_DIR);

const folderHash = await Promise.all(folders.map(async folder => {
    console.log(DATA_DIR, folder);
    const folderPath = path.join(DATA_DIR, folder);
    const hash = await createFolderHash(folderPath);

    return [getValidName(folder), { folderName: folder, hash }];
}));

const flattenedHashMap = Object.fromEntries(folderHash);

const pagesToBeUpdated = folderHash.filter(([folder, { hash }]) => !hasKey(currentHashMap, folder) || currentHashMap[folder].hash !== hash);

const pagesToBeDeleted = Object.entries(currentHashMap).filter(([folder]) => !hasKey(flattenedHashMap, folder));

for(const [folder, { folderName }] of pagesToBeUpdated) {
    try {
        const folderPath = path.join(DATA_DIR, folderName);

        chdir(folderPath);

        const output = execSync("fastn build").toString();

        const outputDirPath = path.join(CURRENT_DIR, folder);

        if(existsSync(outputDirPath)) {
            rmSync(outputDirPath, { recursive: true, force: true });
        }

        console.log(`BUILD ${folder}:`, output);

        const buildDir = path.join(folderPath, '.build');

        if(existsSync(buildDir)) {
            renameSync(buildDir, outputDirPath);
        }
    } catch(e) {
        console.log(e);
    }
}

console.log(pagesToBeDeleted)

for(const [folder] of pagesToBeDeleted) {
    const outputDirPath = path.join(OUTPUT_DIR, folder);

    if(existsSync(outputDirPath)) {
        rmSync(outputDirPath, { recursive: true, force: true });
    }
}

writeFileSync(HASH_FILE, JSON.stringify(flattenedHashMap));
