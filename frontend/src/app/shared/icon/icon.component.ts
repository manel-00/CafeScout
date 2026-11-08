import { Component, Input } from '@angular/core';

export type IconName =
  | 'book'
  | 'laptop'
  | 'leaf'
  | 'users'
  | 'coffee'
  | 'target'
  | 'moon'
  | 'chat'
  | 'wind'
  | 'compass'
  | 'mute'
  | 'home'
  | 'sparkles'
  | 'grid'
  | 'camera'
  | 'wifi'
  | 'bolt'
  | 'sun'
  | 'utensils'
  | 'wallet'
  | 'mapPin'
  | 'clock'
  | 'star'
  | 'arrowRight'
  | 'arrowLeft'
  | 'shuffle'
  | 'check'
  | 'close'
  | 'info'
  | 'heart'
  | 'paw'
  | 'building'
  | 'bike';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
}
