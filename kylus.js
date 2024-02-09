var mineflayer = require("mineflayer");//Projeye Sahip olmak için sağ üst taraftaki ⚡ remix tuşuna basın!
var db = require("quick.db");

var ayar = {
  host: "Sunucu_ip", //Sunucu IPnizi giriniz.
  port: 26487, //Sunucu portunuzu giriniz.
  username: "Kylus", //Sunucuya giriş yapacak bot isminizi girin.
  version: false, //Burayı değiştirmeyin.
};

var kayit = {
  authme: "var", //Sunucunuzda login plugini | varsa > evet | yoksa > yok
  sifre: "ADMIN",
};


// BUNDAN SONRASINI SAKIN ELLEME SONRO BOT SUNUCUDAN ÇIK GİR YAPIYOR!!!! \\



var automessage = true; 

var bot = mineflayer.createBot(ayar);

bot.on("chat", function (username, message) {
  if (username === bot.username) return;
  function intervalFunc() {
    bot.setControlState("sprint", true);
  }
  setInterval(intervalFunc, 7000);

  if (kayit.authme == "var") {
    let giris = db.fetch(`giris_${ayar.host}_${ayar.username}`);
    if (!giris) {
      bot.chat(`/register ${kayit.sifre} ${kayit.sifre}`);
      console.log("Bot kayıt oldu!");
      db.set(`giris_${ayar.host}_${ayar.username}`, "tm");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("Kylus YouTube : https://www.youtube.com/Kylus");
        }, 300000);
      }
    }
    if (giris) {
      bot.chat(`/login ${kayit.sifre}`); //Giriş yapmasını sağladık.
      console.log("Bot giriş yaptı!");

      if (automessage == true) {
        setInterval(() => {
          bot.chat("Kylus YouTube : https://www.youtube.com/Kylus");
        }, 300000);
      }
    }
  }
});

bindEvents(bot);
function bindEvents(bot) {
  bot.on("error", function (err) {
    console.log("Bir hata oluştu!");
  });

  bot.on("end", function () {
    console.log("Bot sunucudan atıldı!");
    setTimeout(relog, 5000);
  });

  function relog() {
    console.log("Sunucuya Tekrardan Baglaniliyor...");
    bot = mineflayer.createBot(ayar);
    bot.on("chat", function (username, message) {
      if (username === bot.username) return;

      console.log("Bot tekrardan oyuna giriş yaptı!");
      bot.chat(`/login ${kayit.sifre}`);

      bot.setControlState("sprint", true);
    });

    bindEvents(bot);
  }
}