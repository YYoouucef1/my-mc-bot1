const mineflayer = require('mineflayer');

function createBot() {
    console.log('جاري محاولة الاتصال بالسيرفر...');
    
    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me',
        port: 52892,
        username: 'Yousef_Hero', // قمت بتغيير الاسم ليكون طبيعياً أكثر
        version: "1.20.1",      // !!! تأكد أن هذا هو إصدار سيرفرك !!!
        hideErrors: true,
        checkTimeoutInterval: 60000
    });

    // معالجة الريسورس باك فوراً عند الطلب
    bot._client.on('resource_pack_send', () => {
        bot._client.write('resource_pack_receive', { result: 3 });
        bot._client.write('resource_pack_receive', { result: 0 });
    });

    bot.on('login', () => {
        console.log('نجحت! البوت دخل السيرفر.');
    });

    bot.on('spawn', () => {
        // التحرك لمنع الطرد
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    // السر هنا: معالجة الخطأ لمنع توقف الكود
    bot.on('error', (err) => {
        console.log('حدث خطأ (ECONNRESET أو غيره)، سأعيد المحاولة بعد 5 ثوانٍ...');
    });

    bot.on('end', () => {
        console.log('انقطع الاتصال، جاري إعادة التشغيل...');
        setTimeout(createBot, 5000);
    });
}

// تشغيل البوت مع حماية من الانهيار الكامل
try {
    createBot();
} catch (e) {
    console.log('خطأ في التشغيل، إعادة محاولة...');
    setTimeout(createBot, 5000);
}
