
const createElement = (tagName = '', classNames = [], onClick) => {
    const element = document.createElement(tagName)
    classNames.forEach(className => element.classList.add(className))
    if (onClick) element.addEventListener('click', onClick)
    return element
}