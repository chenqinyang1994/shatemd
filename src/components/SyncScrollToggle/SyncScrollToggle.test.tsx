import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SyncScrollToggle } from './SyncScrollToggle';

describe('SyncScrollToggle', () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('should render toggle button', () => {
    render(<SyncScrollToggle enabled={true} onToggle={mockOnToggle} />);

    const button = screen.getByRole('button', { name: '同步滚动开关' });
    expect(button).toBeInTheDocument();
  });

  it('should render label text', () => {
    render(<SyncScrollToggle enabled={true} onToggle={mockOnToggle} />);

    const text = screen.getByText('同步滚动');
    expect(text).toBeInTheDocument();
  });

  it('should indicate active state via aria-pressed', () => {
    const { rerender } = render(<SyncScrollToggle enabled={true} onToggle={mockOnToggle} />);

    let button = screen.getByRole('button', { name: '同步滚动开关' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button.className).toContain('active');

    rerender(<SyncScrollToggle enabled={false} onToggle={mockOnToggle} />);

    button = screen.getByRole('button', { name: '同步滚动开关' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button.className).not.toContain('active');
  });

  it('should call onToggle when clicked', () => {
    render(<SyncScrollToggle enabled={true} onToggle={mockOnToggle} />);

    const button = screen.getByRole('button', { name: '同步滚动开关' });
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('should have correct tooltip', () => {
    const { rerender } = render(<SyncScrollToggle enabled={true} onToggle={mockOnToggle} />);

    let button = screen.getByRole('button', { name: '同步滚动开关' });
    expect(button).toHaveAttribute('data-tooltip', '点击关闭同步滚动');

    rerender(<SyncScrollToggle enabled={false} onToggle={mockOnToggle} />);
    button = screen.getByRole('button', { name: '同步滚动开关' });
    expect(button).toHaveAttribute('data-tooltip', '点击开启同步滚动');
  });

  it('should render link icon SVG', () => {
    const { container } = render(<SyncScrollToggle enabled={true} onToggle={mockOnToggle} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<SyncScrollToggle enabled={true} onToggle={mockOnToggle} />);

    expect(container.querySelector('[class*="syncScrollToggle"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="buttonWrapper"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="toggleButton"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="text"]')).toBeInTheDocument();
  });
});
