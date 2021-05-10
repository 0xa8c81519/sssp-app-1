import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-get-paid-to-pay',
  templateUrl: './get-paid-to-pay.component.html',
  styleUrls: ['./get-paid-to-pay.component.less']
})
export class GetPaidToPayComponent implements OnInit {

  @Output() loading: EventEmitter<any> = new EventEmitter();
  @Output() loaded: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
