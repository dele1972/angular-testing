import { Component } from '@angular/core';
import { Task } from '../services/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  taskList: Array<Task>;
  
  foo = new TaskService;
  
  bar = this.foo.getPromiseTaskList()
    .then(
      (data)=> {console.log(data); this.taskList = data},
      (err) => {console.error(err)}
    );

  // taskList: Array<Task> = TaskService.getGeneratedTaskList();

  constructor() { }

}
