// Do not change this part - critical in plugin bundling
import { StdhubPluginApi } from 'stdhub-plugin-api';
import { storageApiDemo } from './storage-api-demo';
import { commandDemo } from './command-demo';
import { playerApiDemo } from './player-api-demo';
export const pluginName = process.env.PLUGIN_NAME!;
export const api = new StdhubPluginApi(pluginName);

async function main(){
  await storageApiDemo();
  await commandDemo();
  await playerApiDemo();
}

main();