
import { spawn } from 'child_process';

export function simpleSpawn(execPath: string, args: string[] = []): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const child = spawn(execPath, args);
        child.stdout.on('data', data => {
            console.log(`${data}`);
        });
        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });
        child.on('exit', (code, signal) => {
            console.log(`completed ${code} ${signal}`);
            if (code !== 0) {
                reject(new Error(`Child process completed with error code: ${code}`));
            } else {
                resolve();
            }
        });
        child.on('error', error => {
            reject(error);
        });
    });
}