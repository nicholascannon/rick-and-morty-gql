# Testing Setup

This project uses Vitest and React Testing Library for testing React components.

## Available Scripts

- `yarn test` - Run tests in watch mode
- `yarn test:run` - Run tests once

## Writing Tests

### Basic Component Test

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing with User Interactions

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

describe('Form Component', () => {
  it('submits form data', async () => {
    const user = userEvent.setup();
    render(<FormComponent />);
    
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(screen.getByText('Form submitted')).toBeInTheDocument();
  });
});
```

### Mocking Dependencies

```tsx
import { vi } from 'vitest';

// Mock a module
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' }))
}));

// Mock a hook
vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '123' })
}));
```

## Test File Naming

- Test files should be named `*.test.tsx` or `*.test.ts`
- Place test files next to the components they test
- Or create a `__tests__` folder in the component directory

## Available Matchers

This setup includes `@testing-library/jest-dom` which provides additional matchers:

- `toBeInTheDocument()`
- `toHaveClass()`
- `toHaveAttribute()`
- `toBeVisible()`
- `toBeDisabled()`
- And many more...

## Testing Best Practices

1. **Test behavior, not implementation** - Focus on what the user sees and does
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test accessibility** - Ensure components work with screen readers
4. **Keep tests simple** - Each test should verify one specific behavior
5. **Use descriptive test names** - Test names should clearly describe what is being tested
