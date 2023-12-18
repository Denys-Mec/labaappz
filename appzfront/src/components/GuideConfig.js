const joyrideConfig = {
    steps1: [
        {
            target: ".header > h1",
            content: "Це назва сторінки, за допомогою якої Ви можете зрозуміти " +
                "де знаходитесь і що Вас тут очікує",
            disableBeacon: true,
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: ".translate-btn",
            content: "За допомогою цієї кнопки Ви можете перекласти сайт на " +
                "потрібну мову",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true
        },
        {
            target: ".help-btn",
            content: "Тут Ви можете отримати пояснення основних термінів на " +
                "сторінці, а також зберегти їх у форматі pdf",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: ".questionnaires-list",
            content: "Тут знаходиться перелік усіх можливих опитувальників",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            placement: "left",
            styles: {
                options: {
                    width: 250,
                },
            },
        },
        {
            target: ".avatar-side",
            content: "На панелі навігації Ви можете перейти на свій профіль",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: "#current-step-of-guide",
            content: "Цей колір на навігаційній панелі вказує, що Ви знаходитесь" +
                " зараз на цій сторінці",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: "#help-step-of-guide",
            content: "Натиснувши на розділ в навігаційній панелі, Ви можете " +
                "перейти на іншу сторінку",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: "#instruction-step-of-guide",
            content: "Натиснувши на розділ в навігаційній панелі, Ви можете " +
                "перейти на іншу сторінку",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        }
    ],

    steps2: [
        {
            target: ".search-input",
            content: "На сторінці з питаннями, Ви можете знайти необхідну " +
                "інформацію за допомогою пошукового поля",
            disableBeacon: true,
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: ".questions-container",
            content: "Ви можете розгорнути будь-яку тему, обрати питання і " +
                "отримати відповідь",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            placement: "left",
            styles: {
                options: {
                    width: 250,
                },
            },
        },
        {
            target: ".header",
            content: "test"
        }

    ],

    steps3: [
        {
            target: ".chat-container",
            content: "Зараз Ви знаходитесь на сторінці чат-боту. В цьому полі " +
                "відображається вся переписка",
            disableBeacon: true,
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: ".footer-button:first-child",
            content: "За допомогою цієї кнопки Ви можете обрати питання з " +
                "переліку заготовлених і отримати відповідь на нього",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            placement: "top"

        },
        {
            target: ".footer-button:last-child",
            content: "Якщо потрібного питання немає в переліку, то ця кнопка " +
                "дозволить Вам ввести своє питання і згодом адміністратор сайту " +
                "дасть на нього відповідь",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            placement: "top",
        },
        {
            target: ".chat-input",
            content: "В цьому полі Ви можете ввести своє питання після вибору " +
                "необхідної кнопки",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            placement: "top",
        },
        {
            target: "body",
            content: "На цьому все, бажаємо приємного користування сайтом!",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            placement: 'center'
        }
    ],

    handleJoyrideCallback: (data, navigate) => {
        let { index } = data;
        if (index === 7) {
            navigate("/questions")
        } else if(index === 2 && document.location.pathname === "/questions") {
            navigate("/chatbot")
        } else if (index === 0 && document.location.pathname === "/chatbot") {
            sessionStorage.setItem("enter", "3");
        } else if (index === 0) {
            sessionStorage.setItem("enter", "0");
        }
    },
};

export default joyrideConfig;