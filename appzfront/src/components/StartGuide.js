import swal from "sweetalert";

const StartGuide = () => {
    swal({
        text: "Ви хочете пройти інтерактивний гайд-інструкцію?",
        buttons: {
            cancel: {
                text: "Ні",
                value: null,
                visible: true,
                closeModal: true,
            },
            confirm: {
                text: "Так",
                value: true,
                visible: true,
                closeModal: true
            }
        }
    })
        .then((start) => {
            if (start) {
                sessionStorage.setItem("enter", "0")
                swal("Lets start!", {
                    icon: "success",
                });
            } else {
                sessionStorage.setItem("enter", "0")
                swal("Next time");
            }
        });
}

export default StartGuide