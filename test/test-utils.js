import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const AllProviders = ({ children, route = '/' }) => (
  <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
);

const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllProviders {...options}>{children}</AllProviders>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
