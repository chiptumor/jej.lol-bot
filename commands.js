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
    }
}
        