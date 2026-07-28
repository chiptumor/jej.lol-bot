import { getPost } from "./get-post.js";

const adminId = "1346147093584019467";

export const commands = {
    booru(interaction) {
        getPost(interaction.options.getString("query"))
        .then(response => interaction.reply(response));
    },
    
    jej(interaction) {
        this.booru(interaction);
    },
    
    gle(interaction) {
        getPost("gle " + interaction.options.getString("query"))
        .then(response => interaction.reply(response));
    },

    "refresh-commands"(interaction) {
        if (interaction.user.id === adminId) {
            interaction.reply("refreshing commands");
            import("../script/refresh-commands.js");
        } else {
            interaction.reply("lole")
        }
    }
};
        