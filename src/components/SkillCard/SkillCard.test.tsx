import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillCard from './SkillCard';

describe('SkillCard', () => {
  it('renders the skill name', () => {
    render(<SkillCard name="Kubernetes" />);
    expect(screen.getByText('Kubernetes')).toBeInTheDocument();
  });
});
