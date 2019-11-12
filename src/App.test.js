import React from 'react';
import Router from '../src/Router/Router'
import Footer from '../src/components/Footer/Footer'
import Nav from '../src/components/Nav/Nav'
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders user shallow correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Nav />, <Router />, <Footer />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
