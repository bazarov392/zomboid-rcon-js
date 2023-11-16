import { Rcon, RconOptions } from 'rcon-client';
import { AccessLevel, Perk, Vehicle } from './interfaces.js';

export type BanUserOptions = {
    ip?: boolean
    reason?: string
}


class ZomboidRconClient
{
    client: Rcon
    constructor(options: RconOptions)
    {
        this.client = new Rcon(options);
    }

    /**
     * Connect to server
     */
    async connect()
    {
        await this.client.connect();
    }

    /**
     * Give an item to a player.
     */
    async addItem(username: string, moduleItem: string, count: number = 1): Promise<string>
    {
        return await this.client.send(`additem "${username}" "${moduleItem}" ${count}`);
    }

    /**
     * Add user
     */
    async addUser(username: string, password: string): Promise<string>
    {
        return await this.client.send(`adduser "${username}" "${password}"`);
    }

    /**
     * Give experience points to a player.
     */
    async addXp(username: string, perk: Perk, value: number): Promise<string>
    {
        return await this.client.send(`addxp "${username}" ${perk}=${value}`);
    }

    /**
     * Spawn a vehicle.
     */
    async addVehicle(username: string, vehicle: Vehicle): Promise<string>
    {
        return await this.client.send(`addvehicle "${vehicle}" "${username}"`);
    }

    /**
     * Sound a building alarm at the Admin's position. (Must be in a room.)
     */
    async alarm()
    {
        return await this.client.send(`alarm`);
    }

    /**
     * Ban a SteamID.
     */

    async banSteamId(steamId: string | number)
    {
        return await this.client.send(`banid ${steamId}`);
    }

    /**
     * Ban a user.
     */
    async banUser(username: string, options: BanUserOptions)
    {
        let command = `banuser "${username}"`;
        if(options.ip) command += ' -ip';
        if(options.reason) command += ` -r "${options.reason}"`;

        return await this.client.send(command);
    }

    /**
     * Place gunshot sounds on a random player.
     */
    async gunshot()
    {
        return this.client.send("gunshot");
    }

    /**
     * Make a player invisible to zombies.
     */
    async invisible(username: string, value: boolean)
    {
        return this.client.send(`invisible "${username}" -${String(value)}`);
    }

    /**
     * Kick a user.
     */
    async kickUser(username: string, reason?: string)
    {
        return this.client.send(`kickuser ${username} ${reason && `-r "${reason}"`}`);
    }

    /**
     * Makes a player pass through walls and structures
     */
    async noclip(username: string, value: boolean)
    {
        return this.client.send(`noclip "${username}" -${String(value)}`);
    }

    /**
     * Saves the current game world
     */
    async save()
    {
        return this.client.send('save');
    }

    /**
     * Broadcast a message to all connected players. 
     */
    async serverMessage(message: string)
    {
        return this.client.send(`servermsg "${message}"`);
    }

    /**
     * Set access level of a player. 
     */
    async setAccessLevel(username: string, level: AccessLevel)
    {
        return this.client.send(`setaccesslevel "${username}" "${level}"`);
    }

    /**
     * Unban a SteamID.
     */
    async unBanId(steamId: string | number)
    {
        return this.client.send(`unbanid ${steamId}`)
    }

    /**
     * Unban a player.
     */
    async unBanUser(username: string)
    {
        return this.client.send(`unbanuser "${username}"`);
    }

    /**
     * Block voice from user
     */
    async voiceBan(username: string, value: boolean)
    {
        return this.client.send(`voiceban "${username}" -${String(value)}`);
    }

    /**
     * List all connected players
     */
    async onlinePlayers(): Promise<string[]>
    {
        const message = await this.client.send('players');
        const matches = [...message.matchAll(/-([A-z0-9_]+)/g)];
        return matches.map(match => match[1]);
    }

    async disconnect()
    {
        await this.client.end();
    }
}

export default ZomboidRconClient;