// Require the necessary discord.js classes
const { Client, Intents, DiscordAPIError, Discord } = require('discord.js');
const { token } = require('./config.json');

const prefix = '!';

const  fs = require('fs');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);

}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}
})

// Login to Discord with your client's token
client.login(token);