module.exports = {
dateOptions : {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '20/09', callback_data: '20/09'},
             {text: '21/09', callback_data: '21/09'},
             {text: '22/09', callback_data: '22/09'}],
             [{text: '23/09', callback_data: '23/09'},
             {text: '24/09', callback_data: '24/09'},
             {text: '25/09', callback_data: '25/09'}],
             [{text: '26/09', callback_data: '26/09'},
             {text: '27/09', callback_data: '27/09'},
             {text: '28/09', callback_data: '28/09'}]

        ]
    })
},
lessonsOptions : {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Китайский', callback_data: JSON.stringify({id: 1, title: "Китайский"})},
             {text: 'Японский', callback_data: JSON.stringify({id: 2, title: "Японский"})},
             {text: 'Немецкий', callback_data: JSON.stringify({id: 3, title: "Немецкий"})}],
             [{text: 'Плавание', callback_data: JSON.stringify({id: 4, title: "Плавание"})},
             {text: 'Модница', callback_data: JSON.stringify({id: 5, title: "Модница"})},
             {text: 'Веселые нотки', callback_data: JSON.stringify({id: 6, title: "Веселые нотки"})}],
             [{text: 'Спортивные Игры', callback_data: JSON.stringify({id: 7, title: "Спортивные Игры"})},
             {text: 'Батут', callback_data: JSON.stringify({id: 8, title: "Батут"})},
             {text: 'Хореография', callback_data: JSON.stringify({id: 9, title: "Хореография"})}]

        ]
    })
}
}
