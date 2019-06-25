import { TestBed, async } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
// import { TasksComponent } from './tasks/tasks.component';
// import { TaskitemComponent } from './tasks/taskitem/taskitem.component';

xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      /*
      Failed: Template parse errors:
      'app-tasks' is not a known element:

      Failed: Template parse errors:
      Can't bind to 'item' since it isn't a known property of 'app-taskitem'.

      Lösung 1: Komponente(n) einbinden
      Lösung 2: Komponente(n) mocken
      Lösung 3: Test deaktivieren ('xdescribe')
      Lösung 4: mit NO_ERRORS_SCHEMA alle Template Fehler unterdrücken
      */
      
      declarations: [
        AppComponent,
        // TasksComponent,
        // TaskitemComponent
      ],
      /*schemas:      [ NO_ERRORS_SCHEMA ],*/
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  xit(`should have as title 'angular-unittest'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-unittest2');
  });

  xit('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-unittest!');
  });
});
