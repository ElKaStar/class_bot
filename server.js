const TelegramApi = require('node-telegram-bot-api')
const {dateOptions, lessonsOptions} = require('./options')

const token = '2021412798:AAHjjmzRadgwZ8EpR3kxRokOswTor3EqM7s'
const helpMsg = `
/sign - запись на кружок,
/delete - отмена записи, 
/list - список детей, записанных на кружок на определенную дату, 
/lesson - список кружков на определенную дату, 
/info - вывод команд`
const bot = new TelegramApi(token, { polling: true })

const lessonsPerDate = {
    1: ['Тихонова Алиса', 'Желтикова Лиза'],
    2: ['Самсонова Наташа','Тихонова Алиса'],
    3: ['Забавин Лев', 'Тихонова Алиса'],
    4: ['Самсонова Наташа', 'Тихонова Алиса'],
    5: ['Самсонова Наташа', 'Тихонова Алиса'],
    6: ['Самсонова Наташа', 'Тихонова Алиса'],
    7: ['Самсонова Наташа', 'Тихонова Алиса'],
    8: ['Самсонова Наташа', 'Тихонова Алиса'],
    9: ['Самсонова Наташа', 'Тихонова Алиса']
}

const lesson1 = { id: 1, title: 'Веселые нотки' }
const lesson2 = { id: 2, title: 'Китайский' }
const lesson3 = { id: 3, title: 'Плавание' }
const lessonsPerDays = {
    '2009': JSON.stringify(lesson1.title),
    '2109': JSON.stringify(lesson2.title),
    '2209': JSON.stringify(lesson2.title)
}
  
const start = () => {

    let dataOfLesson = ''
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/info', description: 'Информация о возможных командах' },
        { command: '/sign', description: 'Запись на вашего ребенка на кружок на определенный день' },
        { command: '/list', description: 'Список детей, записанных на кружок на определенную дату' },
        { command: '/delete', description: 'Отменить запись на вашего ребенка на кружок на определенный день' },
        { command: '/lesson', description: 'Список кружков на определенную дату' }
    ])

    bot.on('message', async msg => {
        const textMsg = msg.text
        const chatId = msg.chat.id

        if (textMsg === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/651/59c/65159c7c-e488-4bcd-b629-102a049f29d0/192/1.webp')
            return bot.sendMessage(chatId, `Автоматическая запись на кружки для 1Е класса. 
        ` + helpMsg)
        }
        if (textMsg === '/help' || textMsg === '/info') {
            return bot.sendMessage(chatId, helpMsg)
            //console.log(msg)
        }
        if (textMsg === '/list') {
            //await bot.sendMessage(chatId, 'Выберете дату')
           //lessonDate = lessonsPerDays[textMsg]
           //console.log(lessonDate)
            return bot.sendMessage(chatId, 'Выберете дату', dateOptions)

            //return bot.sendMessage(chatId, 'Выберете занятие', lessonsOptions)
        }
        //console.log(msg)
        //bot.sendMessage(chatId, 'вы хотите сделать ' + textMsg)
        return bot.sendMessage(chatId, helpMsg)
    })
    let dateOfLesson = undefined
    bot.on('callback_query', async msg => {
       // console.log(msg)
        if (msg.message.text === 'Выберете дату') {
            let chatId = msg.message.chat.id
            dateOfLesson = msg.data
            return bot.sendMessage(chatId, `Выберете занятие`, lessonsOptions)    
        }
        if (msg.message.text === 'Выберете занятие') {
            let chatId = msg.message.chat.id
            const data = JSON.parse(msg.data)
            //console.log(JSON.parse(msg.data))
            const lessonOfTheDay = lessonsPerDate[data.id]
            console.log(lessonOfTheDay.length)
            if (lessonOfTheDay.length > 0) {
                const listForClass = `Список по занятию ${data.title} на дату ${dateOfLesson}:`
                let user = ''
                lessonOfTheDay.forEach(element => {
                    user = `${user}
    ${element}`
                }); 
                return bot.sendMessage(chatId, listForClass + ' ' + user)
            }
            else {
                bot.sendMessage(chatId, `Список по занятию ${data.title} на дату ${dateOfLesson}: Пока нет записанных на занятие`)
            }
          //return bot.sendMessage(chatId, `Список по занятию ${data.title} на дату ${dateOfLesson}: 
          //` + lessonOfTheDay)
        }
        //return bot.sendMessage(chatId, 'Выберете занятие', lessonsOptions)
        //return bot.sendMessage(chatId, `На ` + data)
    })
}
start()