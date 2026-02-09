import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import '../../i18n/config';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders language switcher button', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays current language', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/EN|中/);
  });

  it('toggles language on click', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');

    const initialText = button.textContent;
    fireEvent.click(button);
    const newText = button.textContent;

    expect(newText).not.toBe(initialText);
  });

  it('saves language to localStorage', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    const savedLang = localStorage.getItem('language');
    expect(savedLang).toBeTruthy();
    expect(['en', 'zh']).toContain(savedLang);
  });
});
