import {timer, Subject} from 'rxjs'
import {map, filter, buffer, debounceTime} from 'rxjs/operators'

export const click$ = new Subject()

export const doubleClick$ = click$.pipe(
  buffer(click$.pipe(debounceTime(300))),
  map(clicks => clicks.length),
  filter(clicksLength => clicksLength === 2)
)

export function Requirements(fromNum) {
  return timer(0, 1000).pipe(
    map(second => second + fromNum)
  )
} 