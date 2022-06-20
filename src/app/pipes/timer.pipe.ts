import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';

/**
 * Custom async pipe that runs a timer on a specified delay (in milliseconds)
 */
@Pipe({
    name: 'timer'
})
export class TimerPipe implements PipeTransform {
    transform(delay: number): Observable<number> {
        return timer(0, delay);
    }
}
