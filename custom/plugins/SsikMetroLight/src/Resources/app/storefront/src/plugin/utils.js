export const getElement = (value) => {
    return value instanceof HTMLElement ? value : document.querySelector(value)
}

export const setAttributes = (element, payload) => {
    for (const [k, v] of Object.entries(payload)) {
        element.setAttribute(k, v);
    }
}

export const createElement = (tagName = 'div', className = null, attributes = {}) => {
    const el = document.createElement(tagName);
    if (className) {
        el.classList.add(...className.split(' '));
    }
    if (attributes) {
        setAttributes(el, attributes);
    }
    return el;
} 