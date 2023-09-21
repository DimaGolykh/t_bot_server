import express from 'express';
import routes from './routers.js';
import TelegramBot from 'node-telegram-bot-api';
import ShiftGenarator from './Shifts/controller/Shift_g.js';

// describe tl bot <t.me/erm_g_bot>
const API_KEY_BOT = '6190654327:AAFHHZ7OIHMXXriv7I1D82ifHlJAFhyZs6Q'; //bot t.me/erm_g_bot
const bot = new TelegramBot(process.env.API_KEY_BOT, {
    polling: {
        interval: 300,
        autoStart: true
      }
});

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
            const params ={};
            const sg = new ShiftGenarator();
            const res = sg.generate();
            console.log(res);
            await bot.sendMessage(msg.chat.id, res);
        
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
const host = '127.0.0.1';
const port = 4000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.get("/", async function(request, response){
    
    const whs = new ShiftGenarator();
    const res =  whs.generate();
    console.log('**** = ');
    response.send(res);
});

app.listen(port, host, () =>
console.log(`Server listens http://${host}:${port}`)
);

//exp rest call: http://127.0.0.1:4000/api/sheets/sheet?login=emp1
