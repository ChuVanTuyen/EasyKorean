import { Injectable } from '@angular/core';
import { Observable, Subject, filter, map } from 'rxjs';

interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private eventBus: Subject<BroadcastEvent>;

  constructor() {
    this.eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: any, data?: any) {
    this.eventBus.next({ key, data });
  }

  on<T>(key: any): Observable<T> {
    return this.eventBus.asObservable()
      .pipe(filter(event => event.key === key),
        map(event => event.data as T)
      );
  }
}
