import tippy from 'tippy.js';
import '../style/general.css';

const initializeTippy = (elementId, content) => {
    const elements = document.getElementsByClassName(elementId);

    for (let i = 0; i < elements.length; i++)
        if (elements[i]) {
            tippy(elements[i], {
                content: content,
                allowHTML: true,
                arrow: true,
                theme: 'custom',
            });
        }
};

export default initializeTippy;
