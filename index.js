/**
 * @typedef {Object} element
 * @property {string} type
 * @property {Object.<string, string>} props
 * @property {string|element|Array<string|element>} props.children
 */

/**
 * @param {object} config
 * @return {element}
 */
function createElement(type, props, children=[]) {
	return { 
    type, 
    props: { 
      ...props, 
      children: [].concat(children)
        .map(child => typeof child === 'object' ? child : createTextElement(child))
    } 
  };
}

function createTextElement(value) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

/**
 * @param {element} element
 * @param {HTMLElement} container
 */
function render(element = {}, container) {
	element.props = element.props || {};

	const node = document.createElement(element.type);
	const children = element.props.children;
	delete element.props.children;

	const propNames = Object.keys(element.props);
	propNames.forEach((name) => node[name] = element.props[name]);

	children.forEach((child) => {
    if (typeof child === 'object') {
      render(child, node);
      return;
    }
    
    render(createElement(child), node);
	});

	container.appendChild(node);
}

module.exports = {
  render,
  createElement,
  createTextNode
};
