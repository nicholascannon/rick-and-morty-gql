import { render, screen } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import { useRouteError } from 'react-router';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { ErrorPage } from '../error-page';

vi.mock('react-router');

describe('ErrorPage', () => {
  it('renders error message', () => {
    (useRouteError as Mock).mockReturnValue(new Error('Test error message'));
    render(<ErrorPage />);

    expect(screen.getByText(/oops! an error has occurred/i)).toBeVisible();
    expect(screen.getByText(/test error message/i)).toBeVisible();
  });

  it('should render graphql error message', () => {
    (useRouteError as Mock).mockReturnValue(new GraphQLError('GQL Error'));
    render(<ErrorPage />);

    expect(screen.getByText(/oops! an error has occurred/i)).toBeVisible();
    expect(screen.getByText(/GQL Error/i)).toBeVisible();
  });

  it('renders try again link', () => {
    render(<ErrorPage />);

    const tryAgainLink = screen.getByRole('link', { name: /try again/i });
    expect(tryAgainLink).toBeInTheDocument();
    expect(tryAgainLink).toHaveAttribute('href', document.location.href);
  });
});
