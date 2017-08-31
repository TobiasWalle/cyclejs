import {Observable} from 'rxjs/Observable';
// tslint:disable-next-line:no-import-side-effect
import 'rxjs/add/observable/from';
import {setAdapt} from '@cycle/run/lib/adapt';

import {mockTimeSourceUntyped, timeDriverUntyped, Frame, Comparator, OperatorArgs} from '@cycle/time-common';

setAdapt(stream => Observable.from(stream));

export type Operator = <T>(observable: Observable<T>) => Observable<T>;

export interface TimeSource {
  createOperator<T>(): OperatorArgs<T>;
  animationFrames(): Observable<Frame>;
  delay(delayTime: number): Operator;
  debounce(period: number): Operator;
  throttle(period: number): Operator;
  periodic(period: number): Observable<number>;
  throttleAnimation: Operator;
}

export interface MockTimeSource extends TimeSource {
  diagram(str: string, values?: Object): Observable<any>;
  record(observable: Observable<any>): Observable<Array<any>>;
  assertEqual(
    actual: Observable<any>,
    expected: Observable<any>,
    comparator?: Comparator,
  ): void;
  run(cb?: (err?: Error) => void): void;
}

export function mockTimeSource(args?: Object): MockTimeSource {
  return mockTimeSourceUntyped(args);
}

export function timeDriver(sink: any): TimeSource {
  return timeDriverUntyped(sink);
}
