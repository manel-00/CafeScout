import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { COFFEE_SHOPS } from '../../core/data/coffee-shops.data';
import { CoffeeShopService } from '../../core/services/coffee-shop.service';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import { BrandComponent } from '../../shared/brand/brand.component';
import { IconComponent } from '../../shared/icon/icon.component';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-welcome',
  imports: [BrandComponent, IconComponent, ThemeToggleComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  private readonly router = inject(Router);
  private readonly questionnaire = inject(QuestionnaireService);
  private readonly coffeeShops = inject(CoffeeShopService);

  readonly hasProgress = computed(() => this.questionnaire.answeredCount() > 0);
  readonly featured = COFFEE_SHOPS[1];
  readonly heroSmallOne = COFFEE_SHOPS[3];
  readonly heroSmallTwo = COFFEE_SHOPS[4];

  start(): void {
    if (!this.hasProgress()) {
      this.questionnaire.reset();
    }
    void this.router.navigate(['/quiz']);
  }

  freshStart(): void {
    this.questionnaire.reset();
    this.coffeeShops.clear();
    void this.router.navigate(['/quiz']);
  }
}
