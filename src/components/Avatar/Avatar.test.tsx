import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders initials fallback when src is empty', () => {
    render(<Avatar src="" name="Long Hoang" />);
    expect(screen.getByLabelText('Long Hoang')).toBeInTheDocument();
    expect(screen.getByLabelText('Long Hoang').textContent).toBe('LH');
  });

  it('renders an img when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" name="Long Hoang" />);
    expect(screen.getByRole('img', { name: 'Long Hoang' })).toBeInTheDocument();
  });
});
