import { render, screen } from '@testing-library/react';
import App from './App';

test('renders withoutt crashing', () => {
  render(<App />);
});
