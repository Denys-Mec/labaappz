import "../style/header.css"
import "../style/general.css"
import swal from "sweetalert";
import axios from "axios";
import {useEffect, useState} from "react";
import html2pdf from 'html2pdf.js';

const Header = ({ content, classes }) => {
    const [isAuth, setIsAuth] = useState(false);

    let tooltipes;

    useEffect(() => {
        if (sessionStorage.getItem("token") != null)
            setIsAuth(true);
        else setIsAuth(false)
    }, [isAuth]);

    const helpClick = () => {
        let text= ""

        axios.get('http://127.0.0.1:8000/api/tooltipe/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + sessionStorage.getItem("token")
            },
        }).then( res => {
            tooltipes = res.data.results

            tooltipes.forEach((val, index, array) => {
                if (classes.includes(val.element_name)) {
                    text += "⟩\t";
                    text += val.title
                    text += " - це "
                    text += val.tooltipe.toLowerCase()

                    if (index !== array.length - 1) {
                        text += "\n\n";
                    }
                }
            });

            const saveAsPDF = () => {
                const contentDiv = document.createElement('div');
                contentDiv.innerHTML = "<h1 style='text-align: center'>Довідка</h1>"
                contentDiv.innerHTML += text.replaceAll("\n\n", "<br/><br/>");

                html2pdf(contentDiv, {
                    margin: 10,
                    filename: 'help_document.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                });
            };

            swal({
                title: "Довідка",
                text: text,
                buttons: {
                    saveAsPDF: {
                        text: "Завантажити",
                        value: "saveAsPDF",
                        className: "save-btn"
                    },
                    close: {
                        text: "Закрити",
                        closeModal: true
                    }
                },
                className: "swal-help-page"
            }).then((value) => {
                if (value === "saveAsPDF") {
                    saveAsPDF();
                }
            });
        })
    }

    return (
        <div className={"header"}>
            <h1 className={"page-title"}>{content}</h1>
            {
                isAuth && <button className={"help-btn"} onClick={helpClick}>?</button>
            }
        </div>
    );
};

export default Header;