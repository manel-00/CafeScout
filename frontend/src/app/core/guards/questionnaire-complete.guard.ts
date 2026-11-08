import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { QuestionnaireService } from '../services/questionnaire.service';

export const questionnaireCompleteGuard: CanActivateFn = () => {
  const questionnaire = inject(QuestionnaireService);
  const router = inject(Router);

  if (questionnaire.isComplete()) {
    return true;
  }

  return router.createUrlTree(['/quiz']);
};
