import React from 'react';
import Router from '../src/Router/Router';
import Footer from '../src/components/Footer/Footer';
import Nav from '../src/components/Nav/Nav';
import Forum from '../src/components/Forum/Forum';
import ShallowRenderer from 'react-test-renderer/shallow';
import ForumCatSections from './components/ForumCatSections/ForumCatSections';
import ForumSection from './components/ForumSection/ForumSection';
import ForumContext from '../src/ForumContext';
import Jobs from './components/Jobs/Jobs';

const renderer = new ShallowRenderer();
const tree = renderer.getRenderOutput();
it('renders user shallow correctly', () => {
	renderer.render(<Nav />, <Router />, <Footer />);
	expect(tree).toMatchSnapshot();
});

it('renders forum correctly', () => {
	renderer.render(<Forum />);
	expect(tree).toMatchSnapshot();
});

it('renders forum catagories correctly', () => {
	renderer.render(<ForumCatSections />);
	expect(tree).toMatchSnapshot();
});

it('renders forum section correctly', () => {
	renderer.render(<ForumSection />);
	expect(tree).toMatchSnapshot();
});

it('renders jobs correctly', () => {
	renderer.render(<Jobs context={ForumContext} />);
	expect(tree).toMatchSnapshot();
});
