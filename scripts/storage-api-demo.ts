import { api, pluginName } from './main';
import { Command } from 'stdhub-plugin-api';
import { system } from '@minecraft/server';

export async function storageApiDemo() {
  const storageCmd = new Command()
    .addHandler([] as const, () => {
      system.run(() => testStorageApi());
    });
  await api.registerCommand('storage', storageCmd);
  await api.log('§aType §e.storage§a to test the storage API.');
}

/**
 * This function contains a full demo of APIs since `v0.1.0`.
 */
async function testStorageApi() {
  await api.log('§aRead allowlist.json:');
  const allowlist = await api.readFileAsText('allowlist.json');
  await api.log(`§e${allowlist}`);

  await api.log('§aRead allowlist.json as bytes:');
  const allowlistBytes = await api.readFileAsBytes('allowlist.json');
  await api.log(`§e[${allowlistBytes.join(',')}]`);

  await api.log('§aRead config with defaults:');
  const config = await api.readRootConfig({
    foo: 'bar'
  });
  await api.log(`§e${JSON.stringify(config)}`);

  await api.log('§aThe written config file:');
  const configText = await api.readFileAsText(`plugins/${pluginName}/config.yaml`);
  await api.log(`§e${configText}`);

  await api.log('§aRead sub config file with defaults:');
  const subConfig = await api.readSubConfig('sub', {
    foo: 'bar'
  });
  await api.log(`§e${JSON.stringify(subConfig)}`);

  await api.log('§aThe written sub config file:');
  const subConfigText = await api.readFileAsText(`plugins/${pluginName}/config.yaml`);
  await api.log(`§e${subConfigText}`);

  await api.log('§aWrite data:');
  await api.writeData('foo/bar.json', { key: 'val' }, true);
  await api.log('§eData is successfully written.');

  await api.log('§aRead data:');
  const data = await api.readData('foo/bar.json', true);
  await api.log(`§e${JSON.stringify(data)}`);

  await api.log('§aDelete data:');
  await api.deleteData('foo/bar.json', true);
  await api.log('§aNow read it again. An§a error§a will be thrown:');
  await api.readData('foo/bar.json', true);
}