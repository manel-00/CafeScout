import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { AMENITY_META, SEATING_LABELS } from '../../core/data/shop-meta.data';
import type { AmenityKey, SeatingType } from '../../core/models/coffee-shop.model';
import { CoffeeShopService } from '../../core/services/coffee-shop.service';
import { BrandComponent } from '../../shared/brand/brand.component';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-shop-detail',
  imports: [BrandComponent, IconComponent, RouterLink],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css',
})
export class ShopDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly coffeeShops = inject(CoffeeShopService);

  private readonly routeId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') },
  );

  readonly shop = computed(() => {
    const id = this.routeId();
    return id ? (this.coffeeShops.getById(id) ?? null) : null;
  });

  constructor() {
    if (!this.shop()) {
      void this.router.navigate(['/result']);
    }
  }

  amenityMeta(key: AmenityKey): (typeof AMENITY_META)[AmenityKey] {
    return AMENITY_META[key];
  }

  seatingLabel(seating: SeatingType): string {
    return SEATING_LABELS[seating];
  }

  findAnother(): void {
    this.coffeeShops.pickRandom(this.shop()?.id ?? null);
    void this.router.navigate(['/result']);
  }
}
