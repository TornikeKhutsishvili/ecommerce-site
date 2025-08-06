import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  type: 'add' | 'delete' | 'alert' | 'accept';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  private counter = 0;
  toasts = signal<Toast[]>([]);

  show(type: Toast['type'], message: string, duration = 3000) {
    const id = ++this.counter;
    this.toasts.update(list => [...list, { id, type, message }]);

    setTimeout(() => this.remove(id), duration);
  }

  remove(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

}
