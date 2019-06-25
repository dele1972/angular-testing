import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TaskitemComponent } from './taskitem/taskitem.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
  /*
  got this Error:
    TasksComponent > should create
    Failed: Template parse errors:
    Can't bind to 'item' since it isn't a known property of 'app-taskitem'.

  fix:
    * add TaskitemComponent to declarations
  */
     TestBed.configureTestingModule({
      declarations: [ TasksComponent, TaskitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
