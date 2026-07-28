/******************************************************************************
 * i started writing this while sober of adderall, purely because i wanted    *
 * the end result and not because i actually wanted to write code. the        *
 * current state of the code is pure buttshit and i plan to refactor it ten-  *
 * fold the next time im on adderall.                                         *
 *                                                                            *
 * please do not poke fun at me for the quality of this code unless and until *
 * i have rewritten it. thanks                                                *
 *************************************************************************//***/

import * as Discord from "discord.js";
import * as Dotenv from "dotenv";
import { getPost } from "./get-post.js";
import { commands } from "./commands.js";

Dotenv.config();

// client

const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
]});

client.on(Discord.Events.InteractionCreate, function onCommand(interaction) {
    commands[interaction.commandName](interaction);
});
client.on(Discord.Events.MessageCreate, function onMessage(message) {
    if (!message.content.match(/^::/m)) return;

    getPost(message.content.match(/^::+(.*)/m)[1])
    .then(response => message.channel.send(response))
    .catch(() => console.info("couldn't reply:", message.channelId));
});

client.login(process.env.TOKEN);
