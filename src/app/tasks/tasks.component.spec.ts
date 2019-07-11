import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TaskitemComponent } from './taskitem/taskitem.component';
import { TaskService } from '../services/task.service';
// import { Task } from '../services/task.model';
import { DebugElement } from '@angular/core';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {

    // const taskServiceStub = {
    //   get() {}
    // };

    /*
    got this Error:
      TasksComponent > should create
      Failed: Template parse errors:
      Can't bind to 'item' since it isn't a known property of 'app-taskitem'.

    fix:
      * add TaskitemComponent to declarations
  */
    TestBed.configureTestingModule({
      declarations: [ TasksComponent, TaskitemComponent ],
      providers: [ TaskService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a Task List with async Service data', async(() => {
    const serviceStub = debugElement.injector.get(TaskService);

    spyOn(serviceStub, 'getPromiseTaskList').and.returnValue(Promise.resolve());

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const elements = debugElement.nativeElement.querySelectorAll('ol');
      expect(elements.length).toEqual(1);
    });
  }));

  it('should have as h2 \'Dummy Task List\'', () => {
    fixture.detectChanges();
    const nativeElement = debugElement.nativeElement;
    expect(nativeElement.querySelector('h2').textContent).toContain('Dummy Task List');
  });

  it('should have a table!!!', () => {
    fixture.detectChanges();
    const elements = debugElement.nativeElement.querySelectorAll('table');
    expect(elements.length).toEqual(1);
  });

  it('Should fail - Table should\'nt be visible because of wrong Parameters', () => {
    component.tableData = undefined;
    component.setTableData(123, 321);
    fixture.detectChanges();
    const elements = debugElement.nativeElement.querySelectorAll('table');
    expect(elements.length).toEqual(1);
  });

  it('Should display table, valid Parameters given', () => {
    component.tableData = undefined;
    component.setTableData(['Unittest', 'yeah'], ['123', '321']);
    fixture.detectChanges();
    const elements = debugElement.nativeElement.querySelectorAll('table');
    expect(elements.length).toEqual(1);
  });

});
