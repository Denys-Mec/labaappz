const joyrideConfig = {
    steps: [
        {
            target: ".step1",
            content: "Welcome!! Please spare a minute to learn about our page",
            disableBeacon: true,
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        },
        {
            target: ".help-btn",
            content: "You can log in here",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true
        },
        {
            content: "Welcome!! Please spare a minute to learn about our page",
            hideBackButton: true,
            hideCloseButton: true,
            spotlightPadding: 0,
            target: "#ques > .avatar",
            disableOverlayClose: true,
        },
        {
            target: ".search-input",
            content: "Sign up here, if you're new",
            hideBackButton: true,
            hideCloseButton: true,
            disableOverlayClose: true,
        }
    ],

    handleJoyrideCallback: (data, navigate) => {
        let { index } = data;
        if (index === 3) {
            navigate("/questions")
        } else if (index === 0) {
            sessionStorage.setItem("enter", "0");
        }
    },
};

export default joyrideConfig;