import { Component, OnInit } from '@angular/core';
import { Task } from '../services/task.model';
import { TaskService, TASKITEM } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskList: Array<Task>;
  
  taskService = new TaskService;

  tableData: Array<TASKITEM>;
  
  /**
   * 
   * Wenn die Zeile in der Funktion auskommentiert wird, kann die Tabelle nicht mehr angezeigt werden 
   */
  setTableData(row1: any, row2: any): void {
    if (Array.isArray(row1) && Array.isArray(row1)){
      this.tableData = [{col1: row1[0], col2: row1[1]}, {col1: row2[0], col2: row2[1]}];  
    }
  }

  constructor() { }

  private updateTaskList(): void {
    this.taskService.getPromiseTaskList()
    .then(
      (data)=> {
        this.taskList = data
      },
      (err) => {
        console.error(err)
      }
    );
  }

  ngOnInit(): void {
    this.updateTaskList();
    this.setTableData(['Array1','bla'], ['Array2', 'blupp']);
  }

}
