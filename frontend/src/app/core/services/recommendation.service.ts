import { Injectable } from '@angular/core';

import { QUESTIONS, optionLabel } from '../data/questions.data';
import { AMENITY_META, SEATING_LABELS } from '../data/shop-meta.data';
import type { AmenityKey, CoffeeShop, DrinkKey } from '../models/coffee-shop.model';
import type { AnswerMap } from '../models/question.model';
import type { AnswerSummaryItem, Recommendation, RecommendationReason } from '../models/recommendation.model';

const MOOD_HEADLINES: Record<string, string> = {
  focused: 'A quiet corner with your name on it.',
  tired: 'Somewhere gentle to land.',
  social: 'A table made for a good conversation.',
  stressed: 'A deep breath, served warm.',
  adventurous: 'A little detour worth taking.',
};

const OCCASION_PHRASES: Record<string, string> = {
  study: 'a focused study session',
  work: 'a productive work session',
  relax: 'an unhurried pause',
  social: 'catching up with friends',
  quick: 'a quick coffee run',
};

const BUDGET_MAX: Record<string, number> = { low: 1, mid: 2, high: 3, any: 3 };
const DISTANCE_MAX: Record<string, number> = { '5': 5, '10': 10, '20': 20, any: 999 };

function stringAnswer(answers: AnswerMap, questionId: string): string | undefined {
  const value = answers[questionId];
  return typeof value === 'string' ? value : undefined;
}

function listAnswer(answers: AnswerMap, questionId: string): string[] {
  const value = answers[questionId];
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function friendlyList(items: string[]): string {
  const values = items.filter(Boolean);
  if (values.length === 0) {
    return '';
  }
  if (values.length === 1) {
    return values[0];
  }
  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }
  return `${values.slice(0, -1).join(', ')}, and ${values[values.length - 1]}`;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  build(shop: CoffeeShop, answers: AnswerMap): Recommendation {
    const mood = stringAnswer(answers, 'mood');
    const moodLabel = mood ? optionLabel('mood', mood) : 'thoughtful';
    const headline = (mood && MOOD_HEADLINES[mood]) || 'We found a spot for you.';

    const occasion = stringAnswer(answers, 'occasion');
    const occasionPhrase = (occasion && OCCASION_PHRASES[occasion]) || 'a good coffee';
    const primaryAtmosphere = (shop.atmosphere[0] ?? 'characterful').toLowerCase();
    const primarySpecialty = (shop.specialties[0] ?? 'house coffee').toLowerCase();

    const intro = occasion
      ? `You're here for ${occasionPhrase}, so we went looking for a room that fits the mood. ${shop.name} in ${shop.neighborhood} is our pick — ${primaryAtmosphere} in feel, with ${primarySpecialty} on the menu.`
      : `${shop.name} in ${shop.neighborhood} is our pick — ${primaryAtmosphere} in feel, with ${primarySpecialty} on the menu.`;

    const atmosphereAnswer = stringAnswer(answers, 'atmosphere');
    const atmosphereLabel = atmosphereAnswer ? optionLabel('atmosphere', atmosphereAnswer) : '';
    const atmosphereKey = atmosphereLabel ? normalize(atmosphereLabel.split('&')[0]) : '';
    const atmosphereMatch =
      !!atmosphereKey &&
      shop.atmosphere.some((tag) => {
        const normalizedTag = normalize(tag);
        return normalizedTag === atmosphereKey || normalizedTag.includes(atmosphereKey) || atmosphereKey.includes(normalizedTag);
      });

    let atmosphereReason: RecommendationReason;
    if (atmosphereAnswer && atmosphereMatch) {
      atmosphereReason = {
        icon: 'sparkles',
        title: `The ${atmosphereKey} vibe you asked for`,
        text: `You wanted ${atmosphereLabel.toLowerCase()}, and ${shop.name} leans ${friendlyList(
          shop.atmosphere.map((tag) => tag.toLowerCase()),
        )}. It should feel instantly familiar.`,
        positive: true,
      };
    } else if (atmosphereAnswer) {
      atmosphereReason = {
        icon: 'compass',
        title: 'A different kind of atmosphere',
        text: `${shop.name} is more ${friendlyList(
          shop.atmosphere.map((tag) => tag.toLowerCase()),
        )} than ${atmosphereLabel.toLowerCase()} — a lovely change of pace when you're feeling ${moodLabel.toLowerCase()}.`,
        positive: false,
      };
    } else {
      atmosphereReason = {
        icon: 'sparkles',
        title: 'A room with a point of view',
        text: `The vibe at ${shop.name} is ${friendlyList(
          shop.atmosphere.map((tag) => tag.toLowerCase()),
        )} — the kind of room that does half the work for you.`,
        positive: true,
      };
    }

    const wantedAmenities = unique([...listAnswer(answers, 'essentials'), ...listAnswer(answers, 'extras')]);
    const matchedAmenities = wantedAmenities.filter((key) => shop.amenities.includes(key as AmenityKey));
    const missedAmenities = wantedAmenities.filter((key) => !shop.amenities.includes(key as AmenityKey));
    const matchedAmenityLabels = matchedAmenities.map(
      (key) => AMENITY_META[key as AmenityKey]?.label ?? key,
    );
    const missedAmenityLabels = missedAmenities.map((key) => AMENITY_META[key as AmenityKey]?.label ?? key);

    let essentialsReason: RecommendationReason;
    if (wantedAmenities.length === 0) {
      essentialsReason = {
        icon: 'heart',
        title: 'Keeping it simple',
        text: `You kept your essentials light, which leaves room to enjoy the ${primaryAtmosphere} atmosphere and ${primarySpecialty}.`,
        positive: true,
      };
    } else if (matchedAmenities.length === wantedAmenities.length) {
      essentialsReason = {
        icon: 'check',
        title: 'Every box ticked',
        text: `You said you'd want ${friendlyList(
          matchedAmenityLabels.map((label) => label.toLowerCase()),
        )} — and every one of them is part of the setup at ${shop.name}.`,
        positive: true,
      };
    } else if (matchedAmenities.length > 0) {
      essentialsReason = {
        icon: 'check',
        title: 'Your must-haves are covered',
        text: `You'll find ${friendlyList(
          matchedAmenityLabels.map((label) => label.toLowerCase()),
        )} here. ${friendlyList(missedAmenityLabels)} isn't on the list, but the rest of the visit holds up.`,
        positive: true,
      };
    } else {
      essentialsReason = {
        icon: 'info',
        title: 'A trade-off worth knowing',
        text: `${shop.name} doesn't list ${friendlyList(
          missedAmenityLabels.map((label) => label.toLowerCase()),
        )}, so it isn't a perfect box-ticker. The ${primaryAtmosphere} atmosphere still makes it a considered pick.`,
        positive: false,
      };
    }

    const drinkAnswer = stringAnswer(answers, 'drink');
    const drinkLabel = drinkAnswer ? optionLabel('drink', drinkAnswer) : '';
    const drinkMatch = !!drinkAnswer && shop.drinkTypes.includes(drinkAnswer as DrinkKey);

    let drinkReason: RecommendationReason;
    if (drinkMatch) {
      drinkReason = {
        icon: 'coffee',
        title: 'Right in line with your order',
        text: `You usually reach for ${drinkLabel.toLowerCase()}, and the menu at ${shop.name} covers exactly that kind of cup. Start with ${shop.specialties[0] ?? 'the house coffee'}.`,
        positive: true,
      };
    } else if (drinkAnswer) {
      drinkReason = {
        icon: 'coffee',
        title: 'A specialty worth branching out for',
        text: `You usually go for ${drinkLabel.toLowerCase()}, while ${shop.name} is known for ${primarySpecialty}. Consider it a low-risk little adventure.`,
        positive: false,
      };
    } else {
      drinkReason = {
        icon: 'coffee',
        title: 'Something good in the cup',
        text: `${shop.name} is known for ${primarySpecialty}. It's a good place to order outside your usual.`,
        positive: true,
      };
    }

    const budgetKey = stringAnswer(answers, 'budget') ?? 'any';
    const budgetMax = BUDGET_MAX[budgetKey] ?? 3;
    const fitsBudget = shop.priceLevel <= budgetMax;
    const distanceKey = stringAnswer(answers, 'distance') ?? 'any';
    const distanceMax = DISTANCE_MAX[distanceKey] ?? 999;
    const withinDistance = shop.distanceMinutes <= distanceMax;
    const priority = stringAnswer(answers, 'priority');

    let priorityReason: RecommendationReason;
    if (priority === 'coffee') {
      priorityReason = {
        icon: 'star',
        title: 'Coffee comes first',
        text: `A ${shop.rating.toFixed(1)}-star rating across ${shop.reviewCount} reviews says the cup is taken seriously — exactly what you care about most.`,
        positive: shop.rating >= 4.5,
      };
    } else if (priority === 'atmosphere') {
      priorityReason = {
        icon: 'sparkles',
        title: 'The room does the work',
        text: `You chose atmosphere over everything, and ${shop.name} leans ${friendlyList(
          shop.atmosphere.map((tag) => tag.toLowerCase()),
        )}. Settle in and let the room set the pace.`,
        positive: true,
      };
    } else if (priority === 'seating') {
      priorityReason = {
        icon: 'home',
        title: 'Somewhere to settle in',
        text: shop.amenities.includes('cozySeating')
          ? `${SEATING_LABELS[shop.seating]} is available, with cozy seating for lingering — the comfort you asked for.`
          : `${SEATING_LABELS[shop.seating]} is available. It may not be plush, but there's room to make yourself at home.`,
        positive: shop.amenities.includes('cozySeating'),
      };
    } else if (priority === 'price') {
      priorityReason = {
        icon: 'wallet',
        title: fitsBudget ? 'Kind to your wallet' : 'A little above budget',
        text: fitsBudget
          ? `At ${shop.priceRange}, it sits comfortably inside the budget you had in mind.`
          : `At ${shop.priceRange}, it runs a little above your usual budget — worth it for the right afternoon, but worth knowing.`,
        positive: fitsBudget,
      };
    } else if (priority === 'location') {
      priorityReason = {
        icon: 'mapPin',
        title: withinDistance ? 'An easy stroll away' : 'Slightly beyond your radius',
        text: withinDistance
          ? `${shop.distanceMinutes} minutes from you, so getting there stays part of the treat rather than the chore.`
          : `${shop.distanceMinutes} minutes away — a little farther than you planned, but the ${primaryAtmosphere} room is a nice reward for the walk.`,
        positive: withinDistance,
      };
    } else {
      priorityReason = {
        icon: 'heart',
        title: 'A well-rounded pick',
        text: `${shop.name} pairs a ${primaryAtmosphere} room with ${primarySpecialty} — a balanced choice when you're not asking for one single thing.`,
        positive: true,
      };
    }

    const closing = [
      withinDistance
        ? `At ${shop.distanceMinutes} minutes away, it fits neatly into your day.`
        : `It's ${shop.distanceMinutes} minutes away — a little beyond your usual radius, but a lovely excuse for a wander.`,
      fitsBudget
        ? `Prices sit at ${shop.priceRange}, right in your comfort zone.`
        : `Prices sit at ${shop.priceRange}, a touch above your usual, so save it for a treat.`,
      `Start with ${shop.signature}.`,
    ].join(' ');

    const matchTags = unique([
      atmosphereMatch && atmosphereLabel ? atmosphereLabel : (shop.atmosphere[0] ?? 'Characterful'),
      ...matchedAmenityLabels.slice(0, 2),
      drinkMatch && drinkLabel ? drinkLabel : (shop.specialties[0] ?? 'House coffee'),
      SEATING_LABELS[shop.seating],
    ]).slice(0, 4);

    return {
      shop,
      headline,
      intro,
      reasons: [atmosphereReason, essentialsReason, drinkReason, priorityReason],
      closing,
      matchTags,
    };
  }

  summarize(answers: AnswerMap): AnswerSummaryItem[] {
    return QUESTIONS.filter((question) => {
      const value = answers[question.id];
      return Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value.length > 0;
    }).map((question) => {
      const value = answers[question.id];
      const values = Array.isArray(value) ? value : [value as string];
      return {
        question: question.eyebrow,
        value: values.map((item) => optionLabel(question.id, item)).join(', '),
      };
    });
  }
}
