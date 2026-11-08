import type { IconName } from '../../shared/icon/icon.component';
import type { CoffeeShop } from './coffee-shop.model';

export interface RecommendationReason {
  icon: IconName;
  title: string;
  text: string;
  positive: boolean;
}

export interface Recommendation {
  shop: CoffeeShop;
  headline: string;
  intro: string;
  reasons: RecommendationReason[];
  closing: string;
  matchTags: string[];
}

export interface AnswerSummaryItem {
  question: string;
  value: string;
}
