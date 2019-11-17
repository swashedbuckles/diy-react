const diyeact = require('./index');

test('it should render an element', () => {
  const element = `<h1 title="foo">Hello</h1>`;
  const container = document.getElementById('root');
  diyeact(element, container);
  
});