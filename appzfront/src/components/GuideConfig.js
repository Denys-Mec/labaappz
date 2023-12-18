import { ACTIONS } from 'react-joyride';

const joyrideConfig = {
    steps1: [
        {
            target: ".header > h1",
            content: "Це назва сторінки, за допомогою якої Ви можете зрозуміти " +
                "де знаходитесь і що Вас тут очікує",
            disableBeacon: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: ".translate-btn",
            content: "За допомогою цієї кнопки Ви можете перекласти сайт на " +
                "потрібну мову",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: ".help-btn",
            content: "Тут Ви можете отримати пояснення основних термінів на " +
                "сторінці, а також зберегти їх у форматі pdf",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: ".questionnaires-list",
            content: "Тут знаходиться перелік усіх можливих опитувальників",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true,
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
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: "#current-step-of-guide",
            content: "Цей колір на навігаційній панелі вказує, що Ви знаходитесь" +
                " зараз на цій сторінці",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: "#help-step-of-guide",
            content: "Натиснувши на розділ в навігаційній панелі, Ви можете " +
                "перейти на іншу сторінку",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: "#instruction-step-of-guide",
            content: "Натиснувши на розділ в навігаційній панелі, Ви можете " +
                "перейти на іншу сторінку",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        }
    ],

    steps2: [
        {
            target: ".search-input",
            content: "На сторінці з питаннями, Ви можете знайти необхідну " +
                "інформацію за допомогою пошукового поля",
            disableBeacon: true,
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: ".questions-container",
            content: "Ви можете розгорнути будь-яку тему, обрати питання і " +
                "отримати відповідь",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true,
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
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true
        },
        {
            target: ".footer-button:first-child",
            content: "За допомогою цієї кнопки Ви можете обрати питання з " +
                "переліку заготовлених і отримати відповідь на нього",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true,
            placement: "top"

        },
        {
            target: ".footer-button:last-child",
            content: "Якщо потрібного питання немає в переліку, то ця кнопка " +
                "дозволить Вам ввести своє питання і згодом адміністратор сайту " +
                "дасть на нього відповідь",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true,
            placement: "top",
        },
        {
            target: ".chat-input",
            content: "В цьому полі Ви можете ввести своє питання після вибору " +
                "необхідної кнопки",
            hideCloseButton: true,
            disableOverlayClose: true,
            showSkipButton: true,
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
        let { index, action } = data;

        if (action === ACTIONS.SKIP) {
            sessionStorage.setItem("enter", "0");
        } else if (index === 7) {
            navigate("/questions")
        } else if(index === 2 && document.location.pathname === "/questions") {
            navigate("/chatbot")
        } else if (index === 0 && document.location.pathname === "/questions") {
            sessionStorage.setItem("enter", "2");
        } else if (index === 0 && document.location.pathname === "/chatbot") {
            sessionStorage.setItem("enter", "0");
        }
    },
};

export default joyrideConfig;