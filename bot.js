const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me', // عنوان السيرفر
        port: 52892,                         // المنفذ
        username: 'i_am_just_bot',             // اسم البوت
        version: false                       // سيحدد النسخة تلقائياً
    });

    bot.on('login', () => {
        console.log('البوت دخل السيرفر بنجاح!');
        // حركة بسيطة كل دقيقة لضمان عدم الطرد
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('error', (err) => console.log('خطأ:', err));
    
    // إعادة الاتصال تلقائياً في حال تم طرد البوت أو أغلق السيرفر
    bot.on('end', () => {
        console.log('انقطع الاتصال، جاري المحاولة مرة أخرى...');
        setTimeout(createBot, 30000); 
    });
}

createBot();
