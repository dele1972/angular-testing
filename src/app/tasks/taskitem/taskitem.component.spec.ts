import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskitemComponent } from './taskitem.component';
import { Task } from 'src/app/services/task.model';
import { TasksComponent } from '../tasks.component';

describe('TaskitemComponent', () => {
  let component: TaskitemComponent;
  let fixture: ComponentFixture<TaskitemComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ TaskitemComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    /*
    TasksComponent > should create
Failed: Template parse errors:
Can't bind to 'item' since it isn't a known property of 'app-taskitem'.
     */
    
    TestBed.configureTestingModule({
      declarations: [ TaskitemComponent, TasksComponent ]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(TaskitemComponent);
    component = fixture.componentInstance;
    const item = new Task('Name1', 'Description1', false);
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
