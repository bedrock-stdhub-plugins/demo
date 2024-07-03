import { Command } from 'stdhub-plugin-api';
import { api } from './main';

export function commandDemo() {
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

  api.registerCommand('test', testCmd);
}

// Some possible commands that match the patterns:
// .test push up 114 true
// .test pull down 514 SomeMessage
// .test pull down 1919 "You can use spaces in your message"
// .test pull down 810 "You can even use \" and \\ in your message"