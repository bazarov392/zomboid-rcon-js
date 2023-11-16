# Сlass with RCON commands Project Zomboid

## Install
```bash
npm i --save zomboid-rcon-js
```

## Example Use:

```ts
import ZomboidRconClient from 'zomboid-rcon-js';

const client = new ZomboidRconClient({
    // ... rcon options
});

await client.connect();

const players = await client.onlinePlayers();

for(const player of players)
{
    await client.serverMessage(`Hello, ${player}`);
}

await client.disconnect();
```

## Supported Commands:
Give an item to a player.
```ts
client.addItem('username', 'Base.Axe', 1);
```
Add user.
```ts
client.addUser('username', 'password');
```
Give experience points to a player.
```ts
client.addXp('username', 'Axe', 1000);
```
Spawn a vehicle.
```ts
client.addVehicle('username', 'Base.Van');
```
Sound a building alarm at the Admin's position. (Must be in a room.)
```ts
client.alarm();
```
Ban a SteamID.
```ts
client.banSteamId('steamId');
```
Ban a user.
```ts
client.banUser('username', {
    reason: 'reason',
    ip: true
});
```
Place gunshot sounds on a random player.
```ts
client.gunshot();
```
Make a player invisible to zombies.
```ts
client.invisible('username', true);
```
Kick a user.
```ts
client.kickUser('username', 'reason');
```
Makes a player pass through walls and structures
```ts
client.noclip('username', true);
```
Saves the current game world
```ts
client.save();
```
Broadcast a message to all connected players.
```ts
client.serverMessage('message');
```
Set access level of a player. 
```ts
client.setAccessLevel('username', 'gm');
```
Unban a SteamID.
```ts
client.unBanId('steamId');
```
Unban a player.
```ts
client.unBanUser('username');
```
Block voice from user
```ts
client.voiceBan('username', true);
```
List all connected players
```ts
client.onlinePlayers();
```

