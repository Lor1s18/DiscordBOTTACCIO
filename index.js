const { Message, Channel } = require("discord.js");
const Discord = require("Discord.js");
const client = new Discord.Client();

client.login("process.env.token");

client.on("message", (message) => {
    if (message.content == "!VIP"){
        if(message.member.roles.cache.has("832879913701736480")){
            message.channel.send("Sei un vero VIP!");
        }
        else {
            message.channel.send("Non sei un vero VIP!");
    }
}
})
client.on("message", (message) => {
    if (message.content == "!Fortuna"){
        if(message.member.roles.cache.has("829601556730216508")){
            message.channel.send("Oggi sarai fortunato!");
        }
        else {
            message.channel.send("Non sarai fortunato oggi!");
    }
}
})
client.on("message", (message) =>  {
    if (message.content == "!FivePD") {
       message.channel.send("https://discord.gg/fDMS2VUqeF");
    }
}
)
client.on("message", (message) =>  {
    if (message.content == "!Entrate") {
       message.channel.send("Entrate! @everyone ");
    }
}
)
client.on("message", (message) => {
    if (message.content == "!Esercito"){
        if(message.member.roles.cache.has("831910239007801376")){
            message.channel.send("Sei un vero militare!");
        }
        else {
            message.channel.send("Sei un intruso!");
    }
}
})
client.on("message", (message) =>  {
    if (message.content == "!Colloquio") {
       message.channel.send("Colloqui aperti! @everyone ");
    }
}
)
client.on("message", (message) => {
    if (message.content == "!Carabiniere"){
        if(message.member.roles.cache.has("831152212918927420")){
            message.channel.send("Sei un vero carabicchiere!");
        }
        else {
            message.channel.send("Sei un intruso!");
    }
}
})
client.on("message", (message) =>  {
    if (message.content == "!ColloquioChiuso") {
       message.channel.send("Colloqui chiusi! @everyone ");
    }
}
)
client.on("guildMemberAdd", member =>{
    var canale = client.channels.cache.get("835871146628481044")
    canale.setName("Members: " + member.guild.memberCount) 
})
client.on("guildMemberRemove", member =>{
    var canale = client.channels.cache.get("835871146628481044")
    canale.setName("Members: " + member.guild.memberCount) 
})

client.on("message", message => {
    if (message.content.startsWith("!userinfo")) {
        if (message.content == "!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("User id", "```" + utente.user.id + "```", true)
            .addField("Status", "```" + utente.user.presence.status + "```", true)
            .addField("Is a bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account created", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Joined this server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permissions", "```" + elencoPermessi + "```", false)
            .addField("Roles", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

        message.channel.send(embed)

    }
});
client.on("message", message => {
    if (message.content == "!serverinfo") {
        var server = message.member.guild;

        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;

        var categoryCount = server.channels.cache.filter(c => c.type == "category").size
        var textCount = server.channels.cache.filter(c => c.type == "text").size
        var voiceCount = server.channels.cache.filter(c => c.type == "voice").size

        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le info su questo server")
            .setThumbnail(server.iconURL())
            .addField("Owner", "```" + server.owner.user.username + "```", true)
            .addField("Server id", "```" + server.id + "```", true)
            .addField("Server region", "```" + server.region + "```", true)
            .addField("Members", "```Total: " + server.memberCount + " - Users: " + utentiCount + " - Bots: " + botCount + "```", false)
            .addField("Channels", "```Category: " + categoryCount + " - Text: " + textCount + " - Voice: " + voiceCount + "```", false)
            .addField("Server created", "```" + server.createdAt.toDateString() + "```", true)
            .addField("Boost level", "```Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")```", true)

        message.channel.send(embed)

    }
});
client.on("message", (message) => {
    if (message.content.startsWith("!kick")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))

    }

    if (message.content.startsWith("!ban")) {
        var utenteBan = message.mentions.members.first();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteBan) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!utenteBan.kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + ">" + " è statobannato"))

    }
})
client.on("message", (message) => {
    if (message.content == "!audio") {
        const canaleVocale = message.member.voice.channel;
        if (canaleVocale) {
            canaleVocale.join()
                .then(connection => {
                    connection.play('audio.mp3');
                });
        }
        else {
            message.channel.send("No voice channel.");
        }
    }
})
client.on("message", (message) => {
    if (message.content == "!whitelist") {
        message.channel.send("Clicca la prima reazione")
            .then(messaggio => {
                messaggio.react("👍");
                messaggio.react("👎");

                var filtro = (reaction, user) => ["👍", "👎"].includes(reaction.emoji.name) && user.id == message.author.id;

                messaggio.awaitReactions(filtro, { max: 1, time: 15000 })
                    .then(collected => {
                        var reazione = collected.first().emoji.name;
                        if (reazione == "👍") {
                            message.channel.send("Dai la definizione di : Powergame, Metagame, RDM, VDM, RevengeKill, Stream Sniping, Bunny Hop e infine dal la miglior definizione possibile di RolePlay");
                        }
                        if (reazione == "👎") {
                            message.channel.send("Devi cliccare il pollice in sù!");
                        }

                    }).catch(collected => {
                        return message.channel.send("Tempo scaduto!");
                    })




            })
    }
})
client.on("message", (message) =>  {
    if (message.content == "!live") {
       message.channel.send("https://www.twitch.tv/lor1s18 @everyone ");
    }
}
)
client.on('message', (message) => {
	if (message.content == '!time') {
		var data = new Date();
		var ora = data.getHours();
		var minuto = data.getMinutes();

		message.channel.send(ora + ':' + minuto);
	}
});
