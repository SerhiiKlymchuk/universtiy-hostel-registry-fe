import { animate, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ position: 'relative', opacity: 0, left: '-15px' }),
    animate('300ms 200ms', style({ opacity: 1, left: 0 })),
  ]),

  transition(':leave', [
    style({ opacity: 1}),
    animate('200ms', style({ opacity: 0 })),
  ]),
]);
