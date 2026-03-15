const mineflayer = require('mineflayer');

function createBot() {
    console.log("جاري محاولة الدخول بإصدار متوافق مع 1.21.11...");

    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me',
        port: 52892,
        username: 'Yousef_Hero', 
        version: "1.21", // نستخدم 1.21 كأساس للتوافق مع 1.21.11
        hideErrors: true,
        // إعدادات لزيادة تحمل حجم البيانات (حل مشكلة الصورة)
        checkTimeoutInterval: 60000
    });

    // حل مشكلة الريسورس باك (إجباري في أترنوس)
    bot.on('resourcePack', () => {
        bot.acceptResourcePack();
        console.log("تم قبول الريسورس باك بنجاح.");
    });

    bot.on('login', () => {
        console.log('مبروك! البوت دخل السيرفر الآن.');
    });

    bot.on('spawn', () => {
        // حركة بسيطة كل 30 ثانية لمنع الطرد
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    // إعادة الاتصال كل 5 ثواني في حال حدوث أي خطأ (مثل خطأ الصورة)
    bot.on('error', (err) => {
        console.log('حدث خطأ في الشبكة، سأعيد المحاولة: ' + err.message);
        setTimeout(createBot, 5000);
    });

    bot.on('end', () => {
        console.log('انقطع الاتصال، جاري إعادة المحاولة خلال 5 ثوانٍ...');
        setTimeout(createBot, 5000);
    });
}

// بدء التشغيل
createBot();
