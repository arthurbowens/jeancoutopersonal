import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly whatsappUrl =
    'https://wa.me/5541991999230?text=' +
    encodeURIComponent(
      'Oi Jean! Quero resultado e quero começar meu treino personalizado.',
    );

  readonly year = new Date().getFullYear();
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => {
      const next = !open;
      this.lockScroll(next);
      return next;
    });
  }

  closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.lockScroll(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  private lockScroll(lock: boolean): void {
    if (!this.isBrowser) {
      return;
    }
    document.body.style.overflow = lock ? 'hidden' : '';
  }
}
