/**
 * @typedef {Object} element
 * @property {string} type
 * @property {Object.<string, string>} props
 * @property {string|element|Array<string|element>} props.children
 */

/**
 * @param {element} element
 * @param {HTMLElement} container
 */
function render(element = {}, container) {
  element.props = element.props || {};

  const node = document.createElement(element.type);
  const children = [].concat(element.props.children);
  delete element.props.children;

  const propNames = Object.keys(element.props);
  propNames.forEach(name => node.setAttribute(name, element.props[name]));

  children.forEach(child => {
    if(typeof child === 'string') {
      const text = document.createTextNode(child);
      node.appendChild(text);
    }

    if(typeof child === 'object') {
      render(child, node);
    }
  });

  container.appendChild(node);
}

module.exports = {
  render
};