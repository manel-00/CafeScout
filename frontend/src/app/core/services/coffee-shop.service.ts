import { Injectable, computed, signal } from '@angular/core';

import { COFFEE_SHOPS } from '../data/coffee-shops.data';
import type { CoffeeShop } from '../models/coffee-shop.model';

@Injectable({ providedIn: 'root' })
export class CoffeeShopService {
  private readonly shops = COFFEE_SHOPS;
  private readonly currentIdState = signal<string | null>(null);

  readonly currentId = this.currentIdState.asReadonly();
  readonly current = computed(() => {
    const id = this.currentIdState();
    return id ? (this.shops.find((shop) => shop.id === id) ?? null) : null;
  });

  all(): readonly CoffeeShop[] {
    return this.shops;
  }

  getById(id: string): CoffeeShop | undefined {
    return this.shops.find((shop) => shop.id === id);
  }

  pickRandom(excludeId?: string | null): CoffeeShop {
    const excluded = excludeId ?? this.currentIdState();
    const pool = this.shops.filter((shop) => shop.id !== excluded);
    const choices = pool.length > 0 ? pool : this.shops;
    const shop = choices[Math.floor(Math.random() * choices.length)];

    this.currentIdState.set(shop.id);
    return shop;
  }

  pickAnother(): CoffeeShop {
    return this.pickRandom(this.currentIdState());
  }

  clear(): void {
    this.currentIdState.set(null);
  }
}
