import { Item } from './Item.js';

export class ItemEvent {
  readonly item: Item;

  constructor(item: Item) {
    this.item = item;
  }
}
