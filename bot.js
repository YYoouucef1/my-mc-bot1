const mineflayer = require('mineflayer');

console.log("إعداد البوت... انتظر ثواني");

function createBot() {
    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me',
        port: 52892,
        username: 'Yousef_Hero', 
        version: false, // سيحاول اكتشاف الإصدار تلقائياً
        hideErrors: true
    });

    bot.on('login', () => {
        console.log('مبروك! البوت دخل السيرفر الآن.');
    });

    // التعامل مع الريسورس باك (سبب الطرد الأساسي)
    bot.on('resourcePack', () => {
        bot.acceptResourcePack();
        console.log('تم قبول الريسورس باك');
    });

    // منع خروج البوت بسبب الخطأ - هذا سيبقي الـ Action يعمل
    bot.on('error', (err) => {
        console.log('أترنوس رفض الاتصال (ECONNRESET).. سأحاول مجدداً بعد 5 ثوانٍ');
        setTimeout(createBot, 5000); 
    });

    bot.on('end', () => {
        console.log('انقطع الاتصال.. جاري إعادة الدخول...');
        setTimeout(createBot, 5000);
    });
}

// تشغيل البوت لأول مرة
createBot();
