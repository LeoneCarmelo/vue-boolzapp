const { createApp } = Vue
var DateTime = luxon.DateTime
createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: './assets/img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './assets/img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './assets/img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './assets/img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './assets/img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './assets/img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            activeContact: -1,
            newText: '',
            response: null,
            textToSearch: '',
            popup: false,
            activeMessage: -1,
            welcomePage: true,
            drop: false,
            darkMode: false,
            hoverDark: false,
        }
    },
    methods: {
        /* Remove Welcome Page */
        removeWelcomePage() {
            this.welcomePage = false
        },
        /* showDrop for Dark mode */
        showDrop() {
            this.drop = !this.drop
        },
        activeDarkMode() {
            this.darkMode = !this.darkMode
            this.hoverDark = !this.hoverDark
            let ulEl = document.querySelector('.contacts')
            console.log(ulEl)
            if(this.darkMode){
                contacts = document.querySelectorAll('.contact')
                contacts.forEach(contact => {
                    //console.log(contact.children[0].children[1].children[0]);
                    contact.addEventListener('mouseover', () => {
                        if (contact.classList.contains('bg_dark_mode')) {
                            contact.children[0].children[1].children[0].classList.add('text-dark')
                        }
                    })
                    contact.addEventListener('mouseleave', () => {
                        if (contact.classList.contains('bg_dark_mode')) {
                            contact.children[0].children[1].children[0].classList.remove('text-dark')
                        }
                    })
                });
            }
        },
        /* Selection of the active contact */
        setActiveContact(index) {
            this.activeContact = index
            //console.log(this.activeContact)
            this.newText = ''
            this.popup = false
        },
        /* Selection the last messages */
        getLastMessage(messages) {
            if (messages.length > 0) {
                const lastMessageIndex = messages.length - 1
                const message = messages[lastMessageIndex].message
                return message
            } else {
                return ''
            }
        },
        /* Get the last message with the data last data access */
        getLastDataAccess(messages) {
            if (messages.length > 0) {
                const lastMessageIndex = messages.length - 1
                const entireDateArr = messages[lastMessageIndex].date.split(' ')
                const date = `Ultimo accesso oggi ${entireDateArr[0]}`

                return date
            } else {
                return ''
            }
        },
        /* Get last time access in hours */
        getLastTimeAccess(messages) {
            if (messages.length > 0) {
                const lastMessageIndex = messages.length - 1
                const entireDateArr = messages[lastMessageIndex].date.split(' ')
                const time = `alle ${entireDateArr[1]}`
                return time
            } else {
                return ''
            }
        },
        /* Get all the messages */
        /*         getAllMessages(messages) {
                    return messages.message
                }, */
        /* Get only the date */
        getDataMessage(message) {
            return message.date.split(' ')[1]
        },
        /* Send the new message to the active contact  '10/10/2020 16:51:01'*/
        sendNewMessage(activeContact) {
            if (activeContact != -1) {
                const dt = DateTime.now()
                const dateComaTime = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
                const dateTime = dateComaTime.replace(',', '')
                const newMessageObj = {
                    date: dateTime,
                    message: this.newText,
                    status: 'sent'
                }
                if (newMessageObj.message != '') {
                    this.contacts[activeContact].messages.push(newMessageObj)
                    this.newText = ''
                    this.sendResponse(activeContact)
                }
            } else {
                this.newText = 'Seleziona prima un contatto dalla lista'
            }
        },
        /* Get random answer */
        getResponse(activeContact) {
            //const randomMsgList = ['Ok', 'Non ti preoccupare', 'Certo!', 'Nessun Problema!']
            const randomMsgList = ['Ok']
            let randomMsgIndex = Math.floor(Math.random() * randomMsgList.length)
            let randomMsg = randomMsgList[randomMsgIndex]
            //console.log(randomMsg)
            const dt = DateTime.now()
            const dateComaTime = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            const dateTime = dateComaTime.replace(',', '')
            const responseObj = {
                date: dateTime,
                message: randomMsg,
                status: 'received'
            }
            this.contacts[activeContact].messages.push(responseObj)
        },
        /* Set time to get a answer */
        sendResponse(activeContact) {
            //this.response = setTimeout(this.getResponse(activeContact), 2000)
            this.response = setTimeout(() => {
                this.getResponse(activeContact)
            }, 2000)
        },
        /* Filtered contact depends what we write in the search bar */
        filteredContacts() {
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.textToSearch.toLowerCase()))
        },
        /* Toggle to show and hid the popup message */
        showPopup() {
            this.popup = !this.popup
        },
        /* Select the active message */
        setActiveMessage(index) {
            this.activeMessage = index;
            this.showPopup();
            //console.log(this.activeMessage)
        },
        /* Remove the message */
        removeMessage(activeMessage, allMessages) {
            //console.log(activeMessage, allMessages)
            allMessages.splice(activeMessage, 1)
            this.showPopup()
        }
    },
/*     mounted() {
        contacts = document.querySelectorAll('.contact')
        contacts.forEach(contact => {
            contact.addEventListener('mouseover', () => {
                if (contact.classList.contains('bg_dark_mode')) {
                    contact.children[0].classList.add('text-dark')
                }
            })
            contact.addEventListener('mouseleave', () => {
                if (contact.classList.contains('bg_dark_mode')) {
                    contact.children[0].classList.remove('text-dark')
                }
            })
        });
    } */
}).mount('#app')


