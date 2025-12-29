const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

const TOKEN = 'ENTER YOUR TOKEN HERE';
const stati = [
    "Hello",
    "Made by Attila",
    "Support: https://discord.gg/JKWN5Ybh8Q"
];


async function updateCustomStatus(text) {
    try {
        const response = await fetch('https://discord.com/api/v9/users/@me/settings', {
            method: 'PATCH',
            headers: {
                'Authorization': TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                custom_status: {
                    text: text
                }
            })
        });

        if (response.ok) {
            console.log(`[${new Date().toLocaleTimeString()}] API Success: ${text}`);
        } else {
            console.log(`[${new Date().toLocaleTimeString()}] Error API: ${response.status}`);
        }
    } catch (err) {
        console.error("Error network:", err);
    }
}

client.on('ready', () => {
    console.log(`User: ${client.user.tag}`);
    
    let i = 0;
    setInterval(() => {
        updateCustomStatus(stati[i]);
        i = (i + 1) % stati.length;
    }, 15000); //I recommend you set it to 15 seconds so you avoid the Race Limit and discord won't ban you.
});

client.login(TOKEN);


