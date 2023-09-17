import path from 'path';
import { chdir, cwd } from 'process';
import { execSync } from 'child_process';

const CURRENT_DIR = cwd();

const BIO_DIR = path.join(CURRENT_DIR, 'bios');

const BUILD_DIR = path.join(BIO_DIR, '.build');

const OUTPUT_DIR = path.join(CURRENT_DIR, 'dist');

function build() {
    try {
        chdir(BIO_DIR);

        console.log(execSync("fastn build --edition=2023").toString());

        chdir(BUILD_DIR);

        execSync(`mv ${BUILD_DIR}/* ${OUTPUT_DIR}`);
    } catch(e) {
        console.log(e);
    }
}

build();
