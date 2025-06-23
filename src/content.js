(function() {
    function getTextContent(element) {
        if (!element) return '';
        let text = '';
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent + ' ';
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'NAV', 'HEADER', 'FOOTER', 'ASIDE'].includes(node.tagName.toUpperCase())) {
                    continue;
                }

                if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BR'].includes(node.tagName.toUpperCase())) {
                    text += getTextContent(node) + '\n';
                } else {
                    text += getTextContent(node) + ' ';
                }
            }
        }
        return text.replace(/\s+/g, ' ').trim();
    }

    let mainContent = '';

    const possibleMainElements = [
        document.querySelector('article'),
        document.querySelector('main'),
        document.querySelector('.post-content'),
        document.querySelector('.entry-content'),
        document.querySelector('#content'),
        document.querySelector('#main'),
        document.querySelector('.main-content'),
        document.querySelector('.document-content')
    ];

    for (let el of possibleMainElements) {
        if (el && el.innerText.length > 500) { 
            mainContent = getTextContent(el);
            break;
        }
    }

    if (!mainContent) {
        const bodyClone = document.body.cloneNode(true);
        bodyClone.querySelectorAll('script, style, noscript, iframe, nav, header, footer, aside, .sidebar, .ad, [aria-hidden="true"]').forEach(el => el.remove());
        mainContent = getTextContent(bodyClone);
    }

    mainContent = mainContent
        .replace(/\n\s*\n/g, '\n\n')
        .replace(/Back to top|Cookie Policy|Use of cookies|This site uses cookies/gi, '') 
        .trim();

    return mainContent;
})();