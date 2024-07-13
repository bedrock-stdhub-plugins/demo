import { Command } from 'stdhub-plugin-api';
import { api } from './main';

export async function commandDemo() {
  const testCmd = new Command();

  testCmd.addHandler(
    [
      'push',
      [ 'up', 'down' ],
      { type: 'integer', displayName: 'blocks' },
      { type: 'boolean', displayName: 'break-original' }
    ] as const,
    (player, [ , direction, blocks, breakOriginal ]) => {
      player.sendMessage(`Trying to push ${direction}wards ${blocks} block(s) and ${breakOriginal ? 'to' : 'not to'} break the original blocks.`);
    }
  );

  testCmd.addHandler(
    [
      'pull',
      [ 'up', 'down' ],
      { type: 'integer', displayName: 'blocks', },
      { type: 'string', displayName: 'message', }
    ] as const,
    (player, [ , direction, blocks, msg ]) => {
      player.sendMessage(`Trying to pull ${direction}wards ${blocks} block(s) and emit message ${msg}`);
    }
  );

  await api.registerCommand('test', testCmd, 'test');

  await api.log([
    '§e[Command Demo]',
    '§aType §b.test§a in the terminal, press Enter, and see the usage.',
    '§aLog yourself in the game, and try calling this command again.',
    '§aIf you are not a server operator, you will find that you do not have permission.',
    '§aYou can use the perm command to grant yourself permission to use the test command.',
    '§aTo see the usage of perm command, type §b.perm§a.'
  ].join('\n'));
}

// Some possible commands that match the patterns:
// .test push up 114 true
// .test pull down 514 SomeMessage
// .test pull down 1919 "You can use spaces in your message"
// .test pull down 810 "You can even use \" and \\ in your message"