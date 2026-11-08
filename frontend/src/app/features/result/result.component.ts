import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AMENITY_META, SEATING_LABELS } from '../../core/data/shop-meta.data';
import type { AmenityKey, SeatingType } from '../../core/models/coffee-shop.model';
import { CoffeeShopService } from '../../core/services/coffee-shop.service';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import { RecommendationService } from '../../core/services/recommendation.service';
import { BrandComponent } from '../../shared/brand/brand.component';
import { IconComponent } from '../../shared/icon/icon.component';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-result',
  imports: [BrandComponent, IconComponent, RouterLink, ThemeToggleComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  readonly questionnaire = inject(QuestionnaireService);
  private readonly coffeeShops = inject(CoffeeShopService);
  private readonly recommender = inject(RecommendationService);
  private readonly router = inject(Router);

  readonly recommendation = computed(() => {
    const shop = this.coffeeShops.current();
    if (!shop || !this.questionnaire.isComplete()) {
      return null;
    }
    return this.recommender.build(shop, this.questionnaire.answers());
  });

  readonly recommendationList = computed(() => {
    const recommendation = this.recommendation();
    return recommendation ? [recommendation] : [];
  });

  readonly answerSummary = computed(() => this.recommender.summarize(this.questionnaire.answers()));

  constructor() {
    if (!this.coffeeShops.current()) {
      this.coffeeShops.pickRandom();
    }
  }

  amenityMeta(key: AmenityKey): (typeof AMENITY_META)[AmenityKey] {
    return AMENITY_META[key];
  }

  seatingLabel(seating: SeatingType): string {
    return SEATING_LABELS[seating];
  }

  discoverAnother(): void {
    this.coffeeShops.pickAnother();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  refine(): void {
    this.questionnaire.goTo(0);
    void this.router.navigate(['/quiz']);
  }

  startOver(): void {
    this.questionnaire.reset();
    this.coffeeShops.clear();
    void this.router.navigate(['/']);
  }
}
