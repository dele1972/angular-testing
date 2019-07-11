import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskitemComponent } from './taskitem.component';
import { Task } from 'src/app/services/task.model';
import { TasksComponent } from '../tasks.component';
import { By } from '@angular/platform-browser';

describe('TaskitemComponent', () => {
  let component: TaskitemComponent;
  let fixture: ComponentFixture<TaskitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskitemComponent ]
    })
    .compileComponents();
  }));

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

    // set item property to a dummy task
    const item = new Task('Mocked Taskname', 'Description1', false);
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change an open task by click to done=true', () => {
    // set item property with a done=false task
    const item = new Task('Mocked Taskname', 'Description1', false);
    component.item = item;
    fixture.detectChanges();

    // imitate click
    const element = fixture.debugElement.query(By.css('button'));
    element.triggerEventHandler('click', null);

    // click event should toggle to true (via toggleTask())
    expect(component.item.done).toBe(true);
  });
});
