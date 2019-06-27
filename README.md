# Angular-Testing
Quelle: [Angular-Testing: Unit-Tests und E2E-Tests mit Angular](https://entwickler.de/online/javascript/angular-testing-579793020.html)

<a name="toc"></a>

## Inhalt

1. [Allgemein](#general)
   1. [Unit-Tests](#unit-tests)
   1. [Integrations- und Akzeptanztests](#acceptance-and-integrationstests)
   1. [Angular-Applikationen unterscheidet zwischen zwei Kategorien von Tests](#angular-test-categories)
   1. [(INSTALLATION)](#installation)
   1. [Tests ausführen](#run-tests)
1. [Unit-Tests](#section-unittests)
   1. [Die wichtigsten Elemente von Jasmine](#common-jasmine-elements)
   1. [Unit-Test einer Komponente](#unittest-component)
      1. [Listing1: Test mit Jasmine](#listing1)
      1. [Listing 2: Komponententest](#listing2)
      1. [Listing 3: (Unit-)Test des Templates](#listing3)
   1. [Unit-Test der Kommunikation zwischen den Komponenten](#unittest-component-communications)
      1. [Listing 4: Inputtest](#listing4)
      1. [Listing 5: Outputtest](#listing5)
   1. [Unit-Test von Services](#unittest-services)
      1. [Listing 6: Test eines synchronen Service](#listing6)
      1. [Listing 7: Test eines asynchronen Service](#listing7)
   1. [Unit-Test von Pipes](#unittests-pipes)
      1. [Listing 8: Pipe testen](#listing8)
   1. [Unit-Test von Direktiven](#unittests-directives)
1. [E2E-Tests](#e2e-tests)
   1. [Listing 9: E2E-Test](#listing9)
   1. [Listing 10: Page-Object-Klasse](#listing10)
1. [DIVERSES](#miscellaneous)


<a name="general"></a>

# Allgemein [↸](#toc)

verschiedene Arten von Tests
- unterschiedlich viele Tests pro Kategorie benötigen


<a name="unit-tests"></a>

## Unit-Tests [↸](#toc)
- Basis der Testpyramide
- zahlenmäßig die meisten Tests
- werden während der Entwicklung sehr häufig ausgeführt
- sollten (aus diesem Grund) sehr wenig Laufzeit benötigen
- prüfen nur einzelne Codestücke, in den meisten Fällen handelt es sich dabei um Funktionen

<a name="acceptance-and-integrationstests"></a>

## Integrations- und Akzeptanztests [↸](#toc)
- nächsten beiden Ebenen
- testen nicht mehr nur einzelne, unabhängige Codefragmente, sondern größere Einheiten bis hin zur grafischen Oberfläche
- Anzahl ist wesentlich geringer als die der Unit-Tests
- allerdings ist die Laufzeit auch wesentlich länger, da die Tests das gesamte System einbeziehen


<a name="angular-test-categories"></a>

## Angular-Applikationen unterscheiden zwischen zwei Kategorien von Tests [↸](#toc)
1. **Unit-Tests**
   - auf Basis von Jasmine und Karma (Testrunner,stellt die Infrastruktur zur Verfügung)
   - Bsp: 
     - Liefert das Observable bei einer bestimmten Wertekonstellation eines injizierten Service die korrekten Werte?
     - wird bei einer Fehleingabe die korrekte Exception ausgelöst?
   - nicht alle Template Effekte müssen per E2E getestet werden
     - Eigenschaften und Methodenaufrufe der Komponente wirkt sich teilweise auch auf Template aus, Unit-Test per
     - gezielt nach bestimmten Elementen (anhand von [CSS-Selektoren](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Selectors)) im Template der Komponente suchen
       - DebugElement → Eigenschaft nativeElement → [querySelector()](https://developer.mozilla.org/de/docs/Web/API/Document/querySelector)
       - wohl am häufigsten eingesetzten Methode
     - Elemente anhand bestimmter Direktiven lokalisieren
     - alle Elemente auswählen
       - [querySelectorAll()](https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll)
       - Ergebnis erlaubt Zugriff auf das HTML-Element (Textinhalt z. B. über die Eigenschaft textContent)
2. **End-to-End-Tests (E2E-Tests)**
   - auf Basis von Protractor
   - Benutzerinteraktionen und Workflows
   - Bsp:
     - Eine Tastatureingabe,
     - ein Klick auf einen Button und dann 
     - warten, dass die Applikation mit der korrekten Ausgabe reagiert
* allgemein: auch testgetriebene Entwicklung mit Angular komfortabel möglich
  1. Bestandteile der Applikation wie Komponenten, Pipes oder Services in einem Test beschreiben
  2. gegen diesen Test implementieren
  ⇒ bei dieser Vorgehensweise sehr schnelle Rückmeldung, falls Teile der Applikation durch eine Änderung nicht mehr funktionieren
  ⇒ für Refactorings ein unverzichtbares Hilfsmittel



<a name="installation"></a>

## (INSTALLATION) [↸](#toc)
- mit der regulären Angularinstalltion mit installiert: ```npm install -g @angular/cli```


<a name="run-tests"></a>

## Tests ausführen [↸](#toc)
- Unit-Tests: ```npm test``` (```package.json```)
  - Karma als auch der TypeScript-Compiler werden in einen _watch-Modus_ versetzt
  - Quellcode wird bei jedem Speichern nach einer Änderung neu kompiliert und alle Unit-Tests automatisch ausgeführt
  → kontinuieliche Rückmeldung
- E2E-Tests: ```npm run e2e```



<a name="section-unittests"></a>

# Unit-Tests [↸](#toc)


<a name="common-jasmine-elements"></a>

## Die wichtigsten Elemente von Jasmine [↸](#toc)
| Methode | Beschreibung |
|-----|-------------|
beforeAll(), afterAll()	|	Set-up- und Tear-down-Routinen vor bzw. nach allen Tests
beforeEach(), afterEach()  |	Set-up- und Tear-down-Routinen vor bzw. nach jedem einzelnen Test
describe()	|	Testsuite zur Gruppierung von Tests
it()	|	Einzelner Testfall
expect().toEqual()	|	Assertion, Prüfung innerhalb eines Tests


<a name="unittest-component"></a>

## Unit-Test einer Komponente [↸](#toc)
- Vorgehensweise nicht so trivial wie bei  bei einfachen Klassen und Funktionen
  * da Aufbau komplexer:
    - Komponentenklasse
    - Decorator (der zusätzliche Metainformationen hinzufügt)
    - HTML-Template (sorgt für die Darstellung)
    - optionales Stylesheet
  * **Hilfsmittel** im Modul [@angular.io/core/testing](https://angular.io/api/core/testing)
- Umgebung für den Test vorbereiten
  * diese Schritte werden vor jedem Test durchgeführt
  * stellt sicher, dass der Test in einer sauberen Umgebung ausgeführt wird
  * → richtige Stelle: ```beforeEach-Methode``` von Jasmine
- Das Setup wird in zwei Schritte unterteilt
  * die Erstellung (Konfiguration) eines Testmoduls
    - Erzeugung des Testmoduls erfolgt mit einem Aufruf der ```configureTestingModule-Methode```
    - Dieses Modul stellt die Umgebung dar, in der die zu testende Komponente eingebunden wird (wie NgModule)
    * ! Wenn die Komponente in dem Testmodul nicht in ```declarations``` eingebunden wird, erhält man bei der Ausführung der Tests die folgende Fehlermeldung:
      - „Error: Cannot create the component TaskComponent as it was not imported into the testing module!“
    - **Bei Verwendung von externen Templates und Stylesheets** muss im Testmodul noch die ```compileComponents-Methode``` aufgerufen werden
      * hier manueller Aufruf notwendig im regulären Applikationsbetrieb automatisch
      * dadurch Kontrolle über Reihenfolge und Zeit ⇒ jede einzelne Phase des Lebenszyklus testbar
    - **Bei Abhängigkeiten von Komponenten** (z. B. Services oder Parents/Childs) müssen diese entweder gemockt oder auch in den ```declarations``` aufgeführt werden. Ansonsten erhält man folgende Fehlermeldungen: 
      * „Failed: Template parse errors: 'app-tasks' is not a known element:“
      * „Failed: Template parse errors: Can't bind to 'item' since it isn't a known property of 'app-taskitem'.“
  * die Instanziierung der Komponente
    - mittels: ```createComponent-Methode```
    - Übergabe der Klasse der zu instanziierenden Komponente
    - Rückgabe: ```ComponentFixture```
      - Objekt enthält das ```debugElement```; per ```componentInstance-Eigenschaft``` Zugriff auf Instanz der Komponente
      - per ```debugElement``` auch Einblick auf Template der Komponente
  - Grund: das Kompilieren von Komponenten ist ein asynchroner Prozess und muss deshalb im async-Helper von Angular gekapselt werden
- im Test muss alles manuell durchgeführt werden
  - so auch die Change Detection mittels ```detectChanges``` (dadurch erfolgt auch das Data Binding zw. Komponentenklasse und Template)
    - wenn zu Testzwecken der Wert einer Eigenschaft in der Komponente geändert wurde, muss anschließend die Change Detection angestoßen werden, damit anschließende die Änderung auch im Template wirksam ist


<a name="listing1"></a>

### Listing1: Test mit Jasmine [↸](#toc)
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


<a name="listing2"></a>

### Listing 2: Komponententest [↸](#toc)
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


<a name="listing3"></a>

### Listing 3: (Unit-)Test des Templates [↸](#toc)
```TypeScript
it('should contain the correct title', () => {
  component.title = 'Test';
  fixture.detectChanges();
  const element = fixture.debugElement.nativeElement.querySelector('.title'));
  expect(element.textContent).toEqual('Test');
});
```



<a name="unittest-component-communications"></a>

## Unit-Test der Kommunikation zwischen den Komponenten [↸](#toc)
* Komponentenansatz von Angular
  - Applikationen als Bäume von Komponenten aufgebaut
  - Datenfluss erfolgt häufig über Inputs (Property Binding an Child) und Outputs (Event Emitter an Parent)

- 2 Testvarianten
  - Komponente im Verbund mit einer anderen Komponente
    - Testkomponente erstellen, die die Rolle der eigentlichen Elternkomponente spielt
  - für sich alleine
    - Input und Output simulieren
      - Input z. B. als Wertzuweisung an die Eigenschaft der Komponente
        - Zuweisung sollte bereits vor dem ersten Aufruf der detectChanges-Methode erfolgen ⇒ sonst Fehlermeldungen möglich
          - detectChanges-Methodenaufruf in den Test verlagern, oder
          - Input schon in der beforeEach-Methode zuweisen
        * Der Code im ```beforeEach``` ist allgemeingültig für alle folgenden Tests
      - Output
        - meistens an eine bestimmte Benutzerinteraktion gekoppelt (oder anderes async Ergebnis)


<a name="listing4"></a>

### Listing 4: Inputtest [↸](#toc)
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


<a name="listing5"></a>

### Listing 5: Outputtest [↸](#toc)
```TypeScript
it('should correctly handle output', () => {
  let taskStatus = false;
  component.toggled.subscribe((task) => taskStatus = task.status);
 
  const element = fixture.debugElement.query(By.css('button'));
  element.triggerEventHandler('click', null);
  expect(taskStatus).toBe(true);
});
```


<a name="unittest-services"></a>

## Unit-Test von Services [↸](#toc)
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
    3. **auf die Promise des Service warten** - zwei Möglichkeiten:  
       a) **async-Funktion**
          - es wird eine asynchrone Testzone erzeugt
          - ```whenStable-Methode``` der Test-Fixture gibt ein Promise-Objekt zurück
          - Promise-Object wird  aufgelöst sobald alle Promises in der Zone aufgelöst sind
          - Aufruf der detectChanges-Methode stellt sicher, dass alle Änderungen auch auf das Template angewendet werden
          - Danach kann die Assertion durchgeführt werden

       b) **fakeAsync-Funktion**
          - arbeitet sehr ähnlich wie async-Funktion
          - Code ist linearer und einfacher gestaltet
          - ```tick-Methode``` aufrufen
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



<a name="listing6"></a>

### Listing 6: Test eines synchronen Service [↸](#toc)
```TypeScript
describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
 
  beforeEach(async(() => {
    const taskServiceStub = {
      get() {
        return [
          new Task('Test1', false),
          new Task('Test2', true)
        ];
      }
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
    fixture.detectChanges();
  });
 
  it('should have two children', () => {
    const element = fixture.debugElement.nativeElement.querySelectorAll('li');
    expect(debugElement.length).toEqual(2);
  });
});
```


<a name="listing7"></a>

### Listing 7: Test eines asynchronen Service [↸](#toc)
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


<a name="unittests-pipes"></a>

## Unit-Test von Pipes [↸](#toc)
- können (wie Services) wie ganz normale JavaScript-Objekte getestet werden:
  - Funktionsaufruf mit einem Wert → Assertion erwartet einen bestimmten Rückgabewert
- Objekterzeugung entweder direkt im Test oder (zur Vermeidung von Duplikaten) in einer beforeEach-Routine



<a name="listing8"></a>

### Listing 8: Pipe testen [↸](#toc)
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


<a name="unittests-directives"></a>

## Unit-Test von Direktiven [↸](#toc)
- ähneln gewöhnlichen Komponententests
- für den Test der Direktive muss eine Testkomponente verwendet werden um die Auswirkungen der Direktive zu prüfen
  (ähnlich den Input- und Outputtests)
1. einfache Testkomponente erstellen
2. Direktive im Template anwenden
3. Auswirkungen in Tests prüfen
- Eine Erleichterung für Direktiventests bietet die [```By.directive-Methode```](https://angular.io/api/platform-browser/By) des [@angular/platform-browser](https://angular.io/api/platform-browser) packages
  - darüber können u.a. Elemente im ```DebugElement``` lokalisiert werden, auf die eine bestimmte Direktive angewendet wurde.



<a name="e2e-tests"></a>

# E2E-Tests [↸](#toc)

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
  → Die hierfür erforderlichen Kommandos sollten nicht direkt in den Tests geschrieben werden (unübersichtlich und Kommandos werden häufiger benutzt)
  ⇒ Page Objects (PO) dafür etabliert
     - einfache Klassen, welche die häufigsten Kommandos zum Testen einer Seite beinhalten (navigieren oder finden bestimmter Elemente)
     - PO Klassen werden in den Tests inkludiert (instanziiert im Set-up, Methodenaufruf im Test)
- wichtigstes Element von Protractor ist das ```browser-Objekt```
  - dient zur Steuerung des registrierten Browsers
  - z. B. mit der get-Methode zu einer bestimmten URL navigieren
- das ```element-Objekt``` entspricht der Unit-Test query-Methode des debugElements
  - in Kombination mit dem ```by-Objekt``` können die Elemente der Applikation lokalisiert werden
  - mit der Referenz auf ein Element kann beispielsweise mit den click– oder sendKeys-Methoden eine Benutzerinteraktion simuliert werden
  - Vorteil von Protractor: das Framework wartet automatisch auf die Elemente mit denen interagiert wird
    - d.h. keine explizite Angabe notwendig, wann und wie lange auf welche Elemente gewartet werden soll
- E2E-Tests interagieren wie ein Benutzer mit der Applikation
  - um die korrekte Kommunikation zwischen Komponenten und konkrete Aktionen eines Benutzers zu testen
  - Tests arbeiten auf einer Instanz der Applikation (reicht vom Angular-Frontend bis zum Backend auf dem Server)
  - Laufzeit der E2E-Tests daher auch wesentlich länger als die von Unit-Tests


<a name="listing9"></a>

## Listing 9: E2E-Test [↸](#toc)
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


<a name="listing10"></a>

## Listing 10: Page-Object-Klasse [↸](#toc)
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


<a name="miscellaneous"></a>

# DIVERSES [↸](#toc)

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
* **Isolated** vs **Shallow** vs **Integrated** - verschiedene Testansätze, die auch die o.g. Komponentenverschachtelung berücksichtigen ([Angular component testing with examples](https://medium.com/@bencabanes/angular-component-testing-with-examples-7c52b2b7035e))

## "No binary for Chrome browser on your platform. Please, set "CHROME_BIN" env variable."

### Ubuntu/Linux

Pfad zu den Chromium Binaries herausfinden:
```which chromium```

#### Umgebungsvariable temporär setzen
```export CHROME_BIN=/snap/bin/chromium```

#### Umgebungsvariable permanent setzen
1. ```vi ~/.profile```
2. an's Ende einfügen: ```export CHROME_BIN=/snap/bin/chromium```
	* [vi commands](https://www.cs.colostate.edu/helpdocs/vi.html)
		* ```x``` - delete
		* ```G``` - Cursor in letzte Zeile
		* ```o``` - Neue Zeile nach Cursor einfügen

## foo

### was für Unit-Tests zur Verfügung steht
| Name | Beschreibung |
|---|---|
Jasmine | freie Modultest-Bibliothek für JavaScript
Angular core/testing API | stellt Objekte/Methoden zur Verfügung mit denen Angular Elemente genutzt/ausgelesen werden können
|   | **```TestBed```**```.createComponent``` erstellt eine Komponente und liefert ein ```ComponentFixture``` Objekt
| | ```ComponentFixture``` → nativeElement vs  debugElement.nativeElement
| | nativeElement value will always be an HTMLElement
| | daher [querySelector()](https://developer.mozilla.org/de/docs/Web/API/Document/querySelector) und [querySelectorAll()](https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll) möglich
Karma | HTML testrunner (startet einen HTTP Server)


## Links

* [@angular.io/core/testing](https://angular.io/api/core/testing)
* [An Angular Testing Cheatsheet](https://dev.to/lysofdev/an-angular-testing-cheatsheet-5hj2)
* [Why you shouldn’t use NO_ERRORS_SCHEMA in Angular Unit Tests](https://medium.com/@fivedicephoto/why-you-shouldnt-use-no-errors-schema-in-angular-unit-tests-cdd478c30782)
* [Angular 2 Karma Test 'component-name' is not a known element](https://stackoverflow.com/a/44508549)
* [Simplified Angular unit testing](https://logrocket.com/blog/angular-unit-testing/)
* [Introduction to Unit Testing Angular 2 Components](https://www.sparkbit.pl/unit-testing-angular-2-components-part-1/)
* [Mocking Child Components - Angular 2](https://stackoverflow.com/questions/41240163/mocking-child-components-angular-2)
