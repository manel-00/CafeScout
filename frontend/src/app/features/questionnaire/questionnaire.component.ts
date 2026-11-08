import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import type { IconName } from '../../shared/icon/icon.component';
import { CoffeeShopService } from '../../core/services/coffee-shop.service';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import { BrandComponent } from '../../shared/brand/brand.component';
import { IconComponent } from '../../shared/icon/icon.component';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-questionnaire',
  imports: [BrandComponent, IconComponent, ThemeToggleComponent],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css',
})
export class QuestionnaireComponent {
  private readonly router = inject(Router);
  private readonly coffeeShops = inject(CoffeeShopService);
  readonly questionnaire = inject(QuestionnaireService);

  readonly total = this.questionnaire.total;
  readonly progress = this.questionnaire.progress;
  readonly isFirst = this.questionnaire.isFirst;
  readonly isLast = this.questionnaire.isLast;
  readonly canContinue = this.questionnaire.canContinue;
  readonly stepNumber = computed(() => this.questionnaire.step() + 1);
  readonly nextIcon = computed<IconName>(() => (this.isLast() ? 'sparkles' : 'arrowRight'));

  readonly currentQuestions = computed(() => {
    const question = this.questionnaire.currentQuestion();
    return question ? [question] : [];
  });

  readonly segments = computed(() => {
    const current = this.questionnaire.step();
    return this.questionnaire.questions.map((question, index) => ({
      index,
      id: question.id,
      active: index === current,
      complete: index < current,
    }));
  });

  isSelected(value: string): boolean {
    const question = this.questionnaire.currentQuestion();
    return question ? this.questionnaire.isSelected(question, value) : false;
  }

  choose(value: string): void {
    const question = this.questionnaire.currentQuestion();
    if (question) {
      this.questionnaire.choose(question, value);
    }
  }

  back(): void {
    this.questionnaire.back();
  }

  next(): void {
    if (this.isLast()) {
      this.finish();
      return;
    }
    this.questionnaire.next();
  }

  finish(): void {
    if (!this.questionnaire.isComplete()) {
      return;
    }
    this.coffeeShops.pickRandom();
    void this.router.navigate(['/result']);
  }

  startOver(): void {
    this.questionnaire.reset();
    this.coffeeShops.clear();
    void this.router.navigate(['/']);
  }
}
