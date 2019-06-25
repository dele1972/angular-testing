import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../services/task.model';

@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.css']
})
export class TaskitemComponent implements OnInit {

  @Input() item: Task;
  status: string;

  constructor() { }

  ngOnInit() {
    this.status = this.item.done ? 'done' : 'open';
  }

  toggleTask(): void {
    this.item.done = !this.item.done;
    this.status = this.item.done ? 'done' : 'open';
  }

}
