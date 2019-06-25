# Allgemein

verschiedene Arten von Tests
- unterschiedlich viele Tests pro Kategorie benötigen

## Unit-Tests
- Basis der Testpyramide
- zahlenmäßig die meisten Tests
- werden während der Entwicklung sehr häufig ausgeführt
- sollten (aus diesem Grund) sehr wenig Laufzeit benötigen
- prüfen nur einzelne Codestücke, in den meisten Fällen handelt es sich dabei um Funktionen

## Integrations- und Akzeptanztests
- nächsten beiden Ebenen
- testen nicht mehr nur einzelne, unabhängige Codefragmente, sondern größere Einheiten bis hin zur grafischen Oberfläche
- Anzahl ist wesentlich geringer als die der Unit-Tests
- allerdings ist die Laufzeit auch wesentlich länger, da die Tests das gesamte System einbeziehen

## Angular-Applikationen unterscheidet zwischen zwei Kategorien von Tests:
1. Unit-Tests
   - auf Basis von Jasmine und Karma (Testrunner,stellt die Infrastruktur zur Verfügung)
   - Bsp: 
     - Liefert das Observable bei einer bestimmten Wertekonstellation eines injizierten Service die korrekten Werte?
     - wird bei einer Fehleingabe die korrekte Exception ausgelöst?
   - nicht alle Template Effekte müssen per E2E getestet werden
     - Eigenschaften und Methodenaufrufe der Komponente wirkt sich teilweise auch auf Template aus, Unit-Test per
     - gezielt nach bestimmten Elementen (anhand von CSS-Selektoren) im Template der Komponente suchen
       - DebugElement -> Eigenschaft nativeElement --> **querySelector-Methode**
       - wohl am häufigsten eingesetzten Methode
     - Elemente anhand bestimmter Direktiven lokalisieren
     - alle Elemente auswählen
       - **querySelectorAll-Methode**
       - Ergebnis erlaubt Zugriff auf das HTML-Element (Textinhalt z. B. über die Eigenschaft textContent)
2. End-to-End-Tests (E2E-Tests)
   - auf Basis von Protractor
   - Benutzerinteraktionen und Workflows
   - Bsp:
   - Eine Tastatureingabe,
    - ein Klick auf einen Button und dann 
   - warten, dass die Applikation mit der korrekten Ausgabe reagiert
* allgemein: auch testgetriebene Entwicklung mit Angular komfortabel möglich
  1. Bestandteile der Applikation wie Komponenten, Pipes oder Services in einem Test beschreiben
  2. gegen diesen Test implementieren
  => bei dieser Vorgehensweise sehr schnelle Rückmeldung, falls Teile der Applikation durch eine Änderung nicht mehr funktionieren
  => für Refactorings ein unverzichtbares Hilfsmittel


## (INSTALLATION)
- mit der regulären Angularinstalltion mit installiert: ```npm install -g @angular/cli```

## Tests ausführen
- Unit-Tests: npm test (package.json)
  - Karma als auch der TypeScript-Compiler werden in einen watch-Modus versetzt
  - Quellcode wird bei jedem Speichern nach einer Änderung neu kompiliert und alle Unit-Tests automatisch ausgeführt
  --> kontinuieliche Rückmeldung
- E2E-Tests: npm run e2e


# Unit-Tests

## Die wichtigsten Elemente von Jasmine
| Methode | Beschreibung |
|-----|-------------|
beforeAll(), afterAll()	|	Set-up- und Tear-down-Routinen vor bzw. nach allen Tests
beforeEach(), afterEach()  |	Set-up- und Tear-down-Routinen vor bzw. nach jedem einzelnen Test
describe()	|	Testsuite zur Gruppierung von Tests
it()	|	Einzelner Testfall
expect().toEqual()	|	Assertion, Prüfung innerhalb eines Tests

## Unit-Test einer Komponente
- Vorgehensweise nicht so trivial wie bei  bei einfachen Klassen und Funktionen
  * da Aufbau komplexer:
    - Komponentenklasse
    - Decorator (der zusätzliche Metainformationen hinzufügt)
    - HTML-Template (sorgt für die Darstellung)
    - optionales Stylesheet
  * Hilfsmittel im Modul @angular/core/testing
- Umgebung für den Test vorbereiten
  * diese Schritte werden vor jedem Test durchgeführt
  * stellt sicher, dass der Test in einer sauberen Umgebung ausgeführt wird
  *-> richtige Stelle: beforeEach-Methode von Jasmine
- Das Setup wird in zwei Schritte unterteilt
  * die Erstellung (Konfiguration) eines Testmoduls
    - Erzeugung des Testmoduls erfolgt mit einem Aufruf der **configureTestingModule-Methode**
    - Dieses Modul stellt die Umgebung dar, in der die zu testende Komponente eingebunden wird (wie NgModule)
    ! Falls Sie auf die Integration Ihrer Komponente in das Testmodul verzichten, erhalten Sie bei der Ausführung Ihrer Tests die folgende Fehlermeldung:
      - „Error: Cannot create the component TaskComponent as it was not imported into the testing module!“
    - Bei Verwendung von externen Templates und Stylesheets muss im Testmodul noch die **compileComponents-Methode** aufgerufen werden
      * hier manueller Aufruf notwendig im regulären Applikationsbetrieb automatisch
      * dadurch Kontrolle über Reihenfolge und Zeit => jede einzelne Phase des Lebenszyklus testbar
  * die Instanziierung der Komponente
    - mittels: createComponent-Methode
    - Übergabe der Klasse der zu instanziierenden Komponente
    - Rückgabe: ComponentFixture
      - Objekt enthält debugElement; per componentInstance-Eigenschaft Zugriff auf Instanz der Komponente
      - per debugElement auch Einblick auf Template der Komponente
  - Grund: das Kompilieren von Komponenten ist ein asynchroner Prozess undmuss deshalb im async-Helper von Angular gekapselt werden
- im Test muss alles manuell durchgeführt werden
  - so auch die Change Detection mittels **detectChanges** (dadurch erfolgt auch das Data Binding zw. Komponentenklasse und Template)
    - wenn zu Testzwecken der Wert einer Eigenschaft in der Komponente geändert wurde, muss anschließend die Change Detection angestoßen werden, damit anschließende die Änderung auch im Template wirksam ist

### Listing1: Test mit Jasmine
```TypeScript
describe('Calculator', () => {
  let calc: Calculator;
 
  beforeEach(() => {
    calc = new Calculator();
  });
 
  it('should add 1 and 1 and return 2', () => {
    const result = calc.add(1, 1);
    expect(result).toEqual(2);
  });
});
```

### Listing 2: Komponententest
```TypeScript
describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });
 
  it ('should have an empty title and false status', () => {
    expect(component.title).toEqual('');
    expect(component.status).toEqual(false);
  });
 
  it('should toggle the status', () => {
    component.toggle();
    expect(component.status).toEqual(true);
  });
});
```

### Listing 3: (Unit-)Test des Templates
```TypeScript
it('should contain the correct title', () => {
  component.title = 'Test';
  fixture.detectChanges();
  const element = fixture.debugElement.nativeElement.querySelector('.title'));
  expect(element.textContent).toEqual('Test');
});
```


## Unit-Test der Kommunikation zwischen den Komponenten
* Komponentenansatz von Angular
  - Applikationen als Bäume von Komponenten aufgebaut
  - Datenfluss erfolgt häufig über Inputs (Property Binding an Child) und Outputs (Event Emitter an Parent)

- 2 Testvarianten
  - Komponente im Verbund mit einer anderen Komponente
    - Testkomponente erstellen, die die Rolle der eigentlichen Elternkomponente spielt
  - für sich alleine
    - Input und Output simulieren
      - Input z. B. als Wertzuweisung an die Eigenschaft der Komponente
        - Zuweisung sollte bereits vor dem ersten Aufruf der detectChanges-Methode erfolgen => sonst Fehlermeldungen möglich
          - detectChanges-Methodenaufruf in den Test verlagern, oder
          - Input schon in der beforeEach-Methode zuweisen
        * Der Code im **beforeEach** ist allgemeingültig für alle folgenden Tests
      - Output
        - meistens an eine bestimmte Benutzerinteraktion gekoppelt (oder anderes async Ergebnis)

### Listing 4: Inputtest
```TypeScript
beforeEach(() => {
  fixture = TestBed.createComponent(TaskItemComponent);
  component = fixture.componentInstance;
  const task = new Task('Test', false);
  component.task = task;
  fixture.detectChanges();
});
 
it('should correctly handle input', () => {
  fixture.detectChanges();
  const element = fixture.debugElement.nativeElement.querySelector('.title');
  expect(element.textContent).toEqual('Test');
});
```

### Listing 5: Outputtest
```TypeScript
it('should correctly handle output', () => {
  let taskStatus = false;
  component.toggled.subscribe((task) => taskStatus = task.status);
 
  const element = fixture.debugElement.query(By.css('button'));
  element.triggerEventHandler('click', null);
  expect(taskStatus).toBe(true);
});
```

## Unit-Test von Services
- bzw.:  Komponenten mit Abhängigkeiten testen
- synchroner Service (der z. B. lediglich Daten als Array zur Verfügung stellt):
  - wird nicht direkt in Verbindung mit der Komponente getestet
  - ein Stub-Objekt zur Verfügung stellen, das dieselben Schnittstellen bietet wie der Service, allerdings für den Testzweck besser kontrollierbar ist
- asynchroner Service (liefert Observable- oder Promise-Objekt):
  - Testdoubles von Jasmine verwenden
    - das sind Wrapper-Objekte und -Funktionen, die sowohl zum Auslesen von Funktionsaufrufen (Spy) als auch zur Steuerung von Verhalten (Stubs) verwendet werden
    1. über den Injector eine Referenz auf den Service-Stub holen und einen Jasmine-Stub über die get-Methode des Service anlegen
    2. Stub gibt eine Promise zurück, die sofort mit einem Array mit zwei Taskobjekten aufgelöst wird
       - Trotz der sofortigen Auflösung handelt es sich hierbei um eine asynchrone Operation
    3. auf die Promise des Service warten - zwei Möglichkeiten:
       a) async-Funktion
          - es wird eine asynchrone Testzone erzeugt
          - **whenStable-Methode** der Test-Fixture gibt ein Promise-Objekt zurück
          - Promise-Object wird  aufgelöst sobald alle Promises in der Zone aufgelöst sind
          - Aufruf der detectChanges-Methode stellt sicher, dass alle Änderungen auch auf das Template angewendet werden
          - Danach kann die Assertion durchgeführt werden

       b) fakeAsync-Funktion
          - arbeitet sehr ähnlich wie async-Funktion
          - Code ist linearer und einfacher gestaltet
          - **tick-Methode** aufrufen
          - sorgt dann (ähnlich wie die whenStable-Methode) dafür, dass der folgende Code erst ausgeführt wird, wenn alle Promises der Zone aufgelöst sind
          - Anschließend muss die Change Detection aktiviert werden
          - anschließend die Assertion formulieren
- Generell:
  1. alle Services als Provider im Testmodul registrieren
  2. den Service, der als Abhängigkeit injected werden soll, durch einen Stub ersetzen
  3. Über den Injector kann die Serviceinstanz beeinflusst werden
  - Das Testen von Services und Pipes ist in der Regel auch um einiges einfacher als das Testen von Komponenten
    - es gibt keine Verbindungen zu Templates
    - es muss sich nicht um die Change Detection gekümmert werden



### Listing 7: Test eines asynchronen Service
```TypeScript
describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
 
  beforeEach(async(() => {
    const taskServiceStub = {
      get() {}
    };
 
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent, TaskItemComponent ],
      providers: [
        {provide: TaskService, useValue: taskServiceStub}
      ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
 
    const tasks = [
      new Task('Test1', false),
      new Task('Test2', true)
    ];
    const serviceStub = fixture.debugElement.injector.get(TaskService);
    spyOn(serviceStub, 'get').and.returnValue(Promise.resolve(tasks));
    fixture.detectChanges();
  });
 
  it('should have two children', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const elements = fixture.debugElement.nativeElement.querySelectorAll(‘li’);
      expect(debugElement.length).toEqual(2);
    });
  }));
});
```

## Unit-Test von Pipes
- können (wie Services) wie ganz normale JavaScript-Objekte getestet werden:
  - Funktionsaufruf mit einem Wert -> Assertion erwartet einen bestimmten Rückgabewert
- Objekterzeugung entweder direkt im Test oder (zur Vermeidung von Duplikaten) in einer beforeEach-Routine


### Listing 8: Pipe testen
```TypeScript
describe('UppercasePipe', () => {
  let pipe: UppercasePipe;
  beforeEach(() => {
    pipe = new UppercasePipe();
  });
 
  it('should turn all letters to uppercase', () => {
    const result = pipe.transform('hello World');
    expect(result).toEqual('HELLO WORLD';)
  });
});
```

## Unit-Test von Direktiven
- ähneln gewöhnlichen Komponententests
- für den Test der Direktive muss eine Testkomponente verwendet werden um die Auswirkungen der Direktive zu prüfen
  (ähnlich den Input- und Outputtests)
1. einfache Testkomponente erstellen
2. Direktive im Template anwenden
3. Auswirkungen in Tests prüfen
- Eine Erleichterung für Direktiventests bietet die **By.directive-Methode**
  - darüber können Elemente lokalisiert werden, auf die eine bestimmte Direktive angewendet wurde.


# E2E-Tests

- Test von ganzen Workflows in der Applikation
- die Strukturierung der Testdateien unterscheidet sich von den Unit-Tests:
  - Die Dateien von Unit-Tests werden in Angular normalerweise bei den Dateien abgelegt, die sie testen sollen.
  - E2E-Tests werden in einem separaten Verzeichnis abgelegt, da sie meist nicht direkt einer bestimmten Datei zugeordnet werden können
- Grundlage: Protractor/Webdriver
  - ein Framework, das speziell für Angular entwickelt wurde und auf Webdriver aufbaut
  - Webdriver stellt die Infrastruktur für die Ausführung der Tests zur Verfügung (wie Karma)
    - Browser wird an einer Serverkomponente registriert und Tests ausgeführt
    - Tests werden in Protractor wie in Jasmine-Syntax formuliert
      - es kann also auf Set-up- und Tear-down-Routinen, Testsuites, Tests und Assertions zurückgegriffen werden
- typischer Testaufbau:
  1. zu einer bestimmten Seite navigieren
  2. den Ausgangszustand prüfen
  3. mit der Seite interagieren
  4. die Auswirkungen der Interaktion ebenfalls testen
  -> Die hierfür erforderlichen Kommandos sollten nicht direkt in den Tests geschrieben werden (unübersichtlich und Kommandos werden häufiger benutzt)
  => Page Objects (PO) dafür etabliert
     - einfache Klassen, welche die häufigsten Kommandos zum Testen einer Seite beinhalten (navigieren oder finden bestimmter Elemente)
     - PO Klassen werden in den Tests inkludiert (instanziiert im Set-up, Methodenaufruf im Test)
- wichtigstes Element von Protractor ist das **browser-Objekt**
  - dient zur Steuerung des registrierten Browsers
  - z. B. mit der get-Methode zu einer bestimmten URL navigieren
- das **element-Objekt** entspricht der Unit-Test query-Methode des debugElements
  - in Kombination mit dem **by-Objekt** können die Elemente der Applikation lokalisiert werden
  - mit der Referenz auf ein Element kann beispielsweise mit den click– oder sendKeys-Methoden eine Benutzerinteraktion simuliert werden
  - Vorteil von Protractor: das Framework wartet automatisch auf die Elemente mit denen interagiert wird
    - d.h. keine explizite Angabe notwendig, wann und wie lange auf welche Elemente gewartet werden soll
- E2E-Tests interagieren wie ein Benutzer mit der Applikation
  - um die korrekte Kommunikation zwischen Komponenten und konkrete Aktionen eines Benutzers zu testen
  - Tests arbeiten auf einer Instanz der Applikation (reicht vom Angular-Frontend bis zum Backend auf dem Server)
  - Laufzeit der E2E-Tests daher auch wesentlich länger als die von Unit-Tests

## Listing 9: E2E-Test
```TypeScript
describe('List Page', function() {
  let page: ListPage;
 
  beforeEach(() => {
    page = new ListPage();
  });
 
  it('should have 3 task items', () => {
    page.navigateTo();
    expect(page.getTaskItems().count).toEqual(3);
  });
});
```

## Listing 10: Page-Object-Klasse
```TypeScript
export class ListPage {
  navigateTo() {
    return browser.get('/list');
  }
 
  getTaskItems() {
    return element.all(by.css('li'));
  }
}
```

# DIVERSES

## Aufgefallen

* wenn man ein Projekt erstellt, wird ein lauffähiger Test erstellt
* sobald man eine Applikations-(Baum-)Struktur erstellt, laufen die Tests automatisch auf Fehler:
  1. **Bedenke**: im Test muss vieles/alles manuell gestartet werden
  1. Fehler
    * Meldung: ```Failed: Template parse errors: 'app-tasks' is not a known element:```
    * Meldung: ```Failed: Template parse errors: Can't bind to 'item' since it isn't a known property of 'app-taskitem'.```
    * **Lösung**: Die Komponente importieren und in ```declarations``` mit aufführen
    * **Lösung**: den Test mit ```xdescribe``` deaktivieren
    * Lösung (nicht empfohlen): ```NO_ERRORS_SCHEMA``` von ```@angular/core``` importieren und nach den ```descriptions``` diesen Key/Value anfügen:  
    ```schemas: [ NO_ERRORS_SCHEMA ],```

## Links

* [Why you shouldn’t use NO_ERRORS_SCHEMA in Angular Unit Tests](https://medium.com/@fivedicephoto/why-you-shouldnt-use-no-errors-schema-in-angular-unit-tests-cdd478c30782)
* [Angular 2 Karma Test 'component-name' is not a known element](https://stackoverflow.com/a/44508549)
