import { chdir, cwd } from 'process';
import { execSync } from 'child_process';
import path from 'path';

const HACKTREE_DIR = path.join(cwd(), 'hacktree');

const DIST_DIR = path.join(cwd(), 'dist');

function buildHackTreeLandingPage() {
    console.log("BUILDING LANDING PAGE");

    chdir(HACKTREE_DIR);

    const output = execSync("fastn build").toString();

    console.log(output);

    const buildDir = path.join(HACKTREE_DIR, '.build');

    execSync(`mv ${buildDir}/* ${DIST_DIR}`);

    console.log("LANDING PAGE BUILD COMPLETE");
}

buildHackTreeLandingPage();
