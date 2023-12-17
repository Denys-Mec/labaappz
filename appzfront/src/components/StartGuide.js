import swal from "sweetalert";
import axios from "axios";

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
        },
        className: "swal-guide"
    })
        .then((start) => {
            if (start) {
                sessionStorage.setItem("enter", "2")
                swal("Давайте розпочнемо!", {
                    icon: "success",
                }).then(() => window.location.href = '/questionnaires')
            } else {
                sessionStorage.setItem("enter", "0")
                swal("Наступного разу");
            }
        });

    function guide() {
        axios.get("http://127.0.0.1:8000/api/guide/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + sessionStorage.getItem("token")
            },
        }).then( res => {
            console.log(res.data)
        })
    }
}

export default StartGuide