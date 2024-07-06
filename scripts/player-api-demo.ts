import { system, world } from '@minecraft/server';
import { api, pluginName } from './main';

export async function playerApiDemo() {
  const bannedPlayerConfig = await api.readSubConfig('ban', {
    bannedPlayers: [
      'Gi Hiyo'
    ],
    bannedXuids: [
      '2535467857671696'
    ]
  });
  await api.log('§aJoin this server and see what is logged onto the terminal.');
  await api.log(`§aAlso see '§eplugins/${pluginName}/ban.yaml§a'.`);
  await api.log('§aSet the banned player to your name, restart the server, and join it. See what happens.');
  world.afterEvents.playerJoin.subscribe(event => system.run(async () => {
    const xuid = await api.getXuidByName(event.playerName);
    const name = await api.getNameByXuid(xuid!);
    await api.log(`§a${name}§e's XUID is §a${xuid}§e.`);
  }));
  world.afterEvents.playerSpawn.subscribe(event => system.run(async () => {
    if (bannedPlayerConfig.bannedPlayers.includes(event.player.name)) {
      await api.log(`§cPlayer ${event.player.name} is banned.`);
      await api.kickPlayer(event.player, 'You are banned from this server.');
    }
  }));
}