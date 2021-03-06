import fs from 'fs'
import path from 'path';
import { IConfigDriver } from './types';
import { IConfigReceiverS3 } from './backupr_receiver_s3';
import { IConfigSchedule } from './backupr_scheduled';

export interface IBackuprConfig {
    drivers: Array<IConfigDriver>,
    receivers: Array<IConfigReceiverS3>,
    schedule: IConfigSchedule,
}

export function loadConfig(): IBackuprConfig {
    const configPath = path.join(__dirname, '.backuprconfig.json');
    if (fs.existsSync(configPath) === false) {
        throw new Error('Backupr config not found!');
    }

    const configText = fs.readFileSync(configPath, { encoding: 'utf-8'})
    const configJSON = JSON.parse(configText);
    return configJSON
}
