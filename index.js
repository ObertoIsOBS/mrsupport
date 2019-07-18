const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, RichEmbed} = require('discord.js');
const config = require('./config.json');


// on start
client.on('ready', () => {
client.user.setActivity('your issues', {'type': "LISTENING"});
console.log('Bot Started!!');
});
// on guild message
client.on('message', message => {
    if (!message.guild || message.author.bot) return;

const suppchannel = message.guild.channels.find(ch => ch.name === 'support');
if (!suppchannel) return;

if (message.channel !== suppchannel) return;

//else (if it is suppchannel)

const supplog = message.guild.channels.find(ch => ch.name === 'support-log');
if (!supplog) return message.channel.send('Whoops! It looks like we couldn\'t find the log channel.Ask an administrator to add the "support-log" channel.');

message.delete();

message.channel.send('Perfect! Our support gnomes are working as fast as they can to help you. Please be patient.').then(msg => {
    msg.delete(6000);
});

const newTicket = new Discord.RichEmbed()
.setTitle(message.author.id)
.setAuthor(message.author.tag, message.author.avatarURL)
.addField('Inquery', message.content)
.addField('User', `Member : ${message.author} Tag: ${message.author.tag}`)
.setFooter('Use /reply [id] to respond to this (The embed title is the ID) or just DM them for more direct support.')
.setColor(0x738db);

supplog.send(newTicket);
});

client.on('message', message => {
let prefix = config.prefix;
 var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);

    if (command ==="reply") {
        if (!args) return message.channel.send('Please provide a user ID');
const category = message.guild.channels.find(cat => cat.name ==='Replies' && cat.type ==='category');
if (!category) {
        message.guild.createChannel('Replies', {
            type: 'category',
            permissionOverwrites: [{
                id: message.guild.id,
                deny: ['VIEW_CHANNEL']
            }]
        })
    }
message.guild.createChannel(args.join(' '), {
    type: 'text',
    permissionOverwrites: [{
        id: args.join(' '),
        allow:['VIEW_CHANNEL', 'SEND_MESSAGES']
    }]
})

setTimeout(function () {
let channel = message.guild.channels.find(ch => ch.name===args.join(' '));
if (!channel) return message.channel.send('There was an error making the conversation.');
channel.setParent(category.id);

    message.channel.send(`I have created a conversation here <#${channel.id}>`);            

    },(6000))
}
});

client.on('message', message => {
    let prefix = config.prefix;
     var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
        var args = message.content.split(' ').slice(1);

if (command ==='close') {
    let channel = message.channel;
    const category = message.guild.channels.find(cat => cat.name ==='Replies' && cat.type ==='category');

    if (channel.parent !== category) return message.channel.send('You can only delete reply channels.');
    
    message.channel.delete();

}

});
client.login(config.token);
