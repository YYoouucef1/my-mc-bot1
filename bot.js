const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me',
        port: 52892,
        username: 'Pro_Player_AFK', 
        version: false, // سيحاول التعرف على الإصدار تلقائياً
        hideErrors: true
    });

    // قبول الريسورس باك فوراً وبقوة لتجنب الطرد (ECONNRESET)
    bot.on('resourcePack', () => {
        bot.acceptResourcePack();
        console.log('Resource pack accepted!');
    });

    // معالجة إضافية للريسورس باك لضمان عدم الطرد
    bot._client.on('resource_pack_send', () => {
        bot._client.write('resource_pack_receive', { result: 3 });
        bot._client.write('resource_pack_receive', { result: 0 });
    });

    bot.on('login', () => {
        console.log('تم الدخول بنجاح! البوت الآن في السيرفر.');
        // حركة وقفز لإيهام السيرفر بوجود لاعب حقيقي
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            
            // إرسال رسالة شات عشوائية كل 40 ثانية
            const msgs = ["Server 24/7 Active", "Anti-AFK System", "Stay Online!"];
            bot.chat(msgs[Math.floor(Math.random() * msgs.length)] + " [" + Math.floor(Math.random() * 1000) + "]");
        }, 40000);
    });

    // إعادة الاتصال كل 5 ثواني (5000 ميلي ثانية) في حال انقطع
    bot.on('end', () => {
        console.log('انقطع الاتصال.. إعادة المحاولة بعد 5 ثوانٍ...');
        setTimeout(createBot, 5000); 
    });

    bot.on('error', (err) => {
        console.log('خطأ في الاتصال: ' + err.message);
        // حتى في حال حدوث خطأ، سيحاول إعادة التشغيل بعد 5 ثوانٍ
        setTimeout(createBot, 5000);
    });
}

createBot();
