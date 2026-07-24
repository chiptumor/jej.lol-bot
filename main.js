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

Dotenv.config();

const API_URL = "https://jej.lol";

// client

const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
]});

client.on(Discord.Events.InteractionCreate, function (interaction) {
    getPost(interaction.options.getString("query"))
        .then(response => interaction.reply(response));
});
client.on(Discord.Events.MessageCreate, function (message) {
    if (!message.content.match(/^::/m)) return;

    getPost(message.content.replace(/^::+/m, ""))
        .then(response => message.channel.send(response))
        .catch(() => console.info("couldn't reply:", message.channelId));
});

function getUrl(path) {
    return API_URL + path;
}

async function getPost(search) {
    const query = finalizeQuery(search);

    const post = await fetch(getUrl("/api/random-post?q=" + query))
        .then(r => r.json());

    if (post.url === "")
        return "no image found";
    if (!post.contentUrl)
        return `unknown error (${ JSON.stringify(post) })`;

    return getUrl(post.contentUrl);
}

function finalizeQuery(query) {
    if (!query) return "id:0..";

    let final = query;

    // glegle
    final = final
        .split(" ")
        .map(tag => {
            // dont replace negate tokens
            /* if a negate token has "gle" the search would appear bugged *
             * e.g. "-jingle" --> "-jin glegle"                           *
             * e.g. "-gleep" --> "- glegle ep"                            */
            if (tag[0] === "-") return tag;
            return tag.replace(/(gle)+/g, " glegle ");
        })
        .join(" ");
    
    return final;
}

client.login(process.env.TOKEN);
