/**
 * Copyright 2017 Plexus Interop Deutsche Bank AG
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Work around for 
// https://github.com/yarnpkg/yarn/issues/3330
// to have ability use internal registries and still have lock file in version control

const argv = require('minimist')(process.argv.slice(2));
const shell = require('shelljs');
const backward = !!argv.backward;
const paramName = "NPM_REGISTRY";

console.log(`Looking for ${paramName} env variable`);

const value = process.env[paramName];
if (!value) {
    console.log("Env variable is empty");
    process.exit(0);
}

console.log("Registry value found, replacing lock file entries");

let from = 'resolved "https://registry.npmjs.org';
let to = `resolved "${value}`;

if (backward) {
    const temp = from;
    from = to;
    to = temp;
}

console.log(`Replacing [${from}] to [${to}]`);

shell.ls('yarn.lock').forEach(file => {
    shell.sed('-i', from, to, file);    
});

console.log(`Done!`);


