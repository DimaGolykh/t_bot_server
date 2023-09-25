import express from 'express';
//import routes from './src/routers.js';
import TelegramBot from 'node-telegram-bot-api';
import ShiftGenarator from './src/Shifts/controller/Shift_g.js';
import ip from 'ip';
// describe tl bot <t.me/erm_g_bot>

const API_KEY_BOT = '6190654327:AAEJpu1CycWM6mvnzlaFDYtIcZTRA14B6mI'; //bot t.me/erm_g_bot
const bot = new TelegramBot(API_KEY_BOT, {polling: true});

const commands = [

    {

        command: "start",
        description: "Запуск бота"

    },
    {

        command: "ref",
        description: "Получить реферальную ссылку"

    },
    {

        command: "help",
        description: "Раздел помощи"

    },
    {

        command: "menu",
        description: "Функциональное меню"

    },

]

bot.setMyCommands(commands);

bot.on('text', async msg => {

    console.log(msg);
    
    try {

        if(msg.text.startsWith('/start')) {
            
            await bot.sendMessage(msg.chat.id, `Вы запустили бота!`);

            if(msg.text.length > 6) {

                const refID = msg.text.slice(7);

                await bot.sendMessage(msg.chat.id, `Вы зашли по ссылке пользователя с ID ${refID}`);

            }
        }
        else if(msg.text == '/ref') {

            await bot.sendMessage(msg.chat.id, `${process.env.URL_TO_BOT}?start=${msg.from.id}`);

        }
        else if(msg.text == '/help') {

            await bot.sendMessage(msg.chat.id, `Раздел помощи`);

        }
        else if(msg.text == '/menu') {

            await bot.sendMessage(msg.chat.id, `Меню бота`, {
        
                reply_markup: {
        
                    keyboard: [
        
                        ['⭐️ Смены группы тек. мес.', '⭐️ Сотрудники'],
                        ['⭐️ Генератор смен', '⭐️ Голосовое сообщение'],
                        ['❌ Закрыть меню']
        
                    ]
        
                }
        
            })

        }
        else if(msg.text == '⭐️ Генератор смен') {
            let dt = new Date();
            dt.setHours(12);
            console.log( ' dt = ' + dt + ' st month ' +  dt.getMonth());
            const month = dt.getMonth() + 1; 
            console.log('month ' + month);
            const year = dt.getFullYear()
            const yearMonth = year.toString() + '-' + month.toString();
            const empl = msg.from.username;
            const fio = msg.from.first_name + ' ' + msg.from.last_name;
            const params = {
                "employeerslist" : [{ "fio": fio, "login" : empl, "constantShift" : "" }],
                "setting" : { "yearMonth" : yearMonth , "typeOfGeneration" : "random" }};
            const sg = new ShiftGenarator(params);
            const res = sg.generate();
            const resStr = JSON.stringify(res);
            console.log(res.toString());
            await bot.sendMessage(msg.chat.id, resStr);
        
        }
        else if(msg.text == '❌ Закрыть меню') {

            await bot.sendMessage(msg.chat.id, 'Меню закрыто', {
        
                reply_markup: {
        
                    remove_keyboard: true
        
                }
        
            })
        
        }
        else {

            await bot.sendMessage(msg.chat.id, msg.text);

        }

    }
    catch(error) {

        console.log(error);

    }
})

bot.on("polling_error", err => console.log(err.data.error.message));
//const routes = require('./routes/index.js');


//describe express
const app = express();
//const host = '217.28.220.62';//'127.0.0.1';
const port = 4000;
const ipAddress = ip.address();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/api', routes);
app.get("/", async function(request, response){
    
    const whs = new ShiftGenarator();
    const res =  whs.generate();
    console.log('**** = ');
    response.send(res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    console.log(`Network access via: ${ipAddress}:${port}!`);
  });
