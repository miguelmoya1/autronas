import { EventEmitter } from '@angular/core';

type Newable = { new (...args: readonly unknown[]): unknown };
type AnyFn = (...args: unknown[]) => unknown;

export type ClassProperties<C extends Newable> = {
  [K in keyof InstanceType<C> as InstanceType<C>[K] extends AnyFn
    ? never
    : InstanceType<C>[K] extends EventEmitter<unknown>
      ? never
      : K]: InstanceType<C>[K];
};
