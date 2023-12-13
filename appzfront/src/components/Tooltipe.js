import tippy from 'tippy.js';
import '../style/general.css';

const initializeTippy = (elementId, content) => {
    const elements = document.getElementsByClassName(elementId);
    let temp = false;

    for (let i = 0; i < elements.length; i++)
        if (elements[i]) {
            temp = true;
            tippy(elements[i], {
                content: content,
                allowHTML: true,
                arrow: true,
                theme: 'custom',
            });
        } else temp = false;

    return temp;
};

export default initializeTippy;
