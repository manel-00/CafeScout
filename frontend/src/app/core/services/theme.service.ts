import { Injectable, computed, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'cafescout-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeState = signal<Theme>(this.readInitialTheme());

  readonly theme = this.themeState.asReadonly();
  readonly isDark = computed(() => this.themeState() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.themeState();
      const root = document.documentElement;

      root.dataset['theme'] = theme;
      root.style.colorScheme = theme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'dark' ? '#1e1410' : '#f6f0e7');

      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage may be unavailable (private mode); the visual theme still works.
      }
    });
  }

  toggle(): void {
    this.themeState.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private readInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Fall through to the document/default theme.
    }

    return document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark';
  }
}
