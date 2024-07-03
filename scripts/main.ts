// Do not change this part - critical in plugin bundling
import { StdhubPluginApi } from 'stdhub-plugin-api';
import { storageApiDemo } from './storage-api-demo';
import { commandDemo } from './command-demo';
export const pluginName = process.env.PLUGIN_NAME!;
export const api = new StdhubPluginApi(pluginName);

storageApiDemo();
commandDemo();