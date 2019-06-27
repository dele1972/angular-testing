import { Injectable } from '@angular/core';
import { Task } from './task.model';

export interface TASKITEM {
  col1: string;
  col2: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  static getGeneratedTaskList(): Array<Task> {
    return [
      new Task('Lorem ipsum', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.', false),
      new Task('Diam voluptua', 'Sit amet, consetetur sadipscing elitr ut labore et dolore.', false),
      new Task('Eirmod tempor', 'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor.', false),
      new Task('Stet clita', 'Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.', false),
      new Task('Justo duo dolores', 'Ipsum dolor sit amet, sed diam nonumy eirmod tempor invidunt.', false)
    ]
  }

  constructor() { }

  getPromiseTaskList(returnUndefined=false): Promise<any>{
    
    if (returnUndefined) {
      return undefined;
    }

    return new Promise((resolve) => {
        setTimeout( ()=> {
          let data: any;
          if (returnUndefined) {
            data = undefined
          } else {
            data = TaskService.getGeneratedTaskList();
          }
          resolve(data);
        }, 3000);
    })
  }  
  
}
