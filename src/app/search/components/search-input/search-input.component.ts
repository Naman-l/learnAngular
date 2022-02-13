import { Component, AfterViewInit , ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged, filter, map } from 'rxjs/operators';
// import { map as lodashMap } from 'lodash';



@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
//ensures that the view has been initialized and we can access the input element, thereby avoiding any unnecessary errors later on
export class SearchInputComponent implements AfterViewInit {
  @ViewChild('input') inputElement: ElementRef | any;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  

  ngAfterViewInit(): void {
    let time: number;
    time = 500;
    //operator is used to set up event listeners on a specific element. In this case, we’re interested in listening to the keyup event on the input element
      fromEvent(this.inputElement.nativeElement, 'keyup')
        .pipe(
          debounceTime(time),
          pluck('target', 'value'),
          //We use the pluck('target','value') to get the value property from the input object. This is equivalent to input.target.value
          distinctUntilChanged(),
          // distinctUntilChanged() ensures that the current value is different from the last value. Otherwise, it discards it.
          map((value) => value)
          // The map operator returns the value as an Observable.
          //  This allows us to subscribe to it, in which case the value can be sent over to the parent component (which we’ve yet to define) using the Output event emitter we defined.
        )
        .subscribe(value => {
          this.search.emit(value);
        });
    }
  
}
