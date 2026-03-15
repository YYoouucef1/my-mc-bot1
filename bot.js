const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me',
        port: 52892,
        username: 'Yousef_System', 
        version: "1.21.1", // حددنا الإصدار بدقة ليتوافق مع 1.21.11
        hideErrors: true
    });

    // حل مشكلة الـ Cookies الجديدة في إصدار 1.21
    bot._client.on('cookie_request', (packet) => {
        bot._client.write('cookie_response', {
            key: packet.key,
            payload: null
        });
    });

    bot.on('resourcePack', () => {
        bot.acceptResourcePack();
    });

    bot.on('login', () => {
        console.log('نجاح! تم تجاوز مشكلة الـ Cookies والدخول للسيرفر.');
    });

    bot.on('error', (err) => {
        setTimeout(createBot, 5000);
    });

    bot.on('end', () => {
        setTimeout(createBot, 5000);
    });
}

createBot();
