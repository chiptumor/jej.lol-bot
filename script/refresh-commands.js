import * as Dotenv from "dotenv";
import * as Discord from "discord.js";

Dotenv.config();

const booruCommandConfig = {
    options: [{
        name: "query",
        description: "Search query",
        type: Discord.ApplicationCommandOptionType.String
    }],
    type: Discord.ApplicationCommandType.ChatInput,
    integration_types: [
        Discord.ApplicationIntegrationType.UserInstall,
        Discord.ApplicationIntegrationType.GuildInstall
    ],
    contexts: [
        Discord.InteractionContextType.Guild,
        Discord.InteractionContextType.PrivateChannel
    ]
}

const commands = [
    {
        name: "booru",
        description: "Display a post from jej.lol",
        ...booruCommandConfig
    },
    {
        name: "gle",
        description: "Display a gle post from jej.lol",
        ...booruCommandConfig
    }
];

const rest = new Discord.REST().setToken(process.env.TOKEN);

rest.put(Discord.Routes.applicationCommands(process.env.ID), { body: [] })
.then(() => rest.put(Discord.Routes.applicationCommands(process.env.ID), { body: commands }))
.catch(console.error);
