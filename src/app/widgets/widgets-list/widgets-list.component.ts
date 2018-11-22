import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Widget } from '../ServiceModel/widgets-model';
import { WidgetsServiceService } from '../ServiceModel/widgets-service.service';


@Component({
  selector: 'app-widgets-list',
  templateUrl: './widgets-list.component.html',
  styleUrls: ['./widgets-list.component.css']
})
export class WidgetsListComponent implements OnInit {
  @Input() widgets: Widget[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
