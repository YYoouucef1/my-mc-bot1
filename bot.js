const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me',
        port: 52892,
        username: 'Pro_AntiAFK',
        hideErrors: true, // لإخفاء أخطاء الريسورس باك
        version: false
    });

    // قبول الريسورس باك تلقائياً
    bot.on('resourcePack', () => {
        bot.acceptResourcePack();
    });

    bot.on('login', () => {
        console.log('البوت دخل السيرفر!');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 1000);
            
            const messages = ["Server stays ON!", "Keep alive!", "24/7 Mode"];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            bot.chat(randomMsg + " [" + Math.floor(Math.random() * 100) + "]");
        }, 30000);
    });

    bot.on('end', () => setTimeout(createBot, 30000));
    bot.on('error', (err) => console.log('Error:', err));
}

createBot();
