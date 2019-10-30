# Jasmine

<a name="toc"></a>

## Table of content
1. [Informations](#infos)
   1. [TestBed.configureTestingModule](#testbed-configuretestingmodule)
   1. [use HttpClientTestingModule instead of HttpClientModule for testing](#use-httpclienttestingmodule-instead-of-httpclientmodule-for-testing)
   1. [how to handle 'nested components'?](#how-to-handle-nested-components)
      1. [Stubbing unneeded components](#stubbing-unneeded-components)
      1. [Ignore unrecognized elements and attributes (NO_ERRORS_SCHEMA)](#NO_ERRORS_SCHEMA)
1. [Links](#links)
1. [Fixing Test-Errors / Mocking](#fixing-test-errors-mocking)
   1. [error: "The pipe 'translate' could not be found"](#the-pipe-translate-could-not-be-found)
   1. [error: "Can't bind to 'formGroup' since it isn't a known property of 'form'."](#can-not-bind-to-formgroup')
   1. [error: "StaticInjectorError(DynamicTestModule)\[PostboxInfosComponent -> HttpService\]"](#staticinjectorerror-dynamictestmodule-unknown-service)
   1. [error: "TypeError: Cannot read property 'id' of undefined"](#cannot-read-property-xy-of-undefined)
1. [Technologies used in](#technologies-used-in)

<a name="infos"></a>

## Informations [↸](#toc)

<a name="testbed-configuretestingmodule"></a>

### TestBed.configureTestingModule [↸](#toc)

* __imports__ array is for importing modules such as BrowserModule, FormsModule, HttpModule
* __declarations__ array is for your Components, Pipes, Directives


<a name="use-httpclienttestingmodule-instead-of-httpclientmodule-for-testing"></a>

### use HttpClientTestingModule instead of HttpClientModule for testing [↸](#toc)

* see [stackoverflow](https://stackoverflow.com/questions/52116993/jasmin-karma-error-unexpected-value-httpclient-imported-by-the-module-dy/52133396)


<a name="how-to-handle-nested-components"></a>

### how to handle 'nested components'? [↸](#toc)

<a name="stubbing-unneeded-components"></a>

#### Stubbing unneeded components [↸](#toc)

* (stub = Stummel, Stumpf)
* see [angular.io](https://angular.io/guide/testing#stubbing-unneeded-components)

```javascript
	@Component({selector: 'app-banner', template: ''})
	class BannerStubComponent {}

	// ...

	TestBed.configureTestingModule({
	  declarations: [
	    AppComponent,
	    BannerStubComponent
	  ]
	})
```

<a name="NO_ERRORS_SCHEMA"></a>

#### Ignore unrecognized elements and attributes (NO_ERRORS_SCHEMA) [↸](#toc)

* This will render the components as empty Tags and the Browser will ignore them
* see [angular.io](https://angular.io/guide/testing#no_errors_schema)

```javascript
	TestBed.configureTestingModule({
	  declarations: [ AppComponent ],
	  schemas: [ NO_ERRORS_SCHEMA ]
	})
```


<a name="links"></a>

## Links [↸](#toc)

### HSE Angular Testing

* [frontend-research/angular-testing](https://gitlab.hornetsecurity.com/pdc/frontend-research/angular-testing/blob/master/README.md#e2e-tests)
* [test/unittest_e2e](https://gitlab.hornetsecurity.com/pdc/ngCp/commits/test/unittest_e2e)
* [angular-adv-table/tree/feature/e2e](https://gitlab.hornetsecurity.com/pdc/hse-component/angular-adv-table/tree/feature/e2e)

### jasmine


https://stackoverflow.com/questions/40319045/mock-custom-service-in-angular2-during-unit-test
https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine

https://www.ng-conf.org/2019/mocking-dependencies-angular/
https://stackoverflow.com/questions/40319045/mock-custom-service-in-angular2-during-unit-test


https://wr.informatik.uni-hamburg.de/_media/teaching/wintersemester_2010_2011/siw-1011-ehmke-tests-ausarbeitung.pdf

http://pi.informatik.uni-siegen.de/stt/23_4/01_Fachgruppenberichte/TAV/P7RuppQueinsTAV20.pdf


<a name="fixing-test-errors-mocking"></a>

## Fixing Test-Errors / Mocking [↸](#toc)



<a name="the-pipe-translate-could-not-be-found"></a>

### error: "The pipe 'translate' could not be found" [↸](#toc)

* see ```src/app/base/main/customer-settings/postbox/postbox-list/postbox-infos/postbox-infos.component.spec.ts```

#### complete message:
```console
	Failed: Template parse errors:
	The pipe 'translate' could not be found ("<div class="m-postbox-infos">
	
	  <h4>{{ [ERROR ->]'customer_settings.postbox.infos.title' | translate }}</h4>
```

#### solution
```javascript
	import { Pipe, PipeTransform } from '@angular/core';

	// between import & describe
	@Pipe({
	  	name: 'translate',
	})
	export class TranslatePipeMock implements PipeTransform {
	  name = 'translate';
	
	  transform(query: string, ...args: Array<any>): any {
	    return query;
	  }
	}

	// beforeEach(...
	TestBed.configureTestingModule({
		declarations: [ ..., TranslatePipeMock ],
		imports: [ ],
	})
	.compileComponents();
```



<a name="can-not-bind-to-formgroup"></a>

### error: "Can't bind to 'formGroup' since it isn't a known property of 'form'." [↸](#toc)

* see ```src/app/base/main/customer-settings/postbox/postbox-list/postbox-infos/postbox-infos.component.spec.ts```

#### complete message:
```console
	Failed: Template parse errors:
	Can't bind to 'formGroup' since it isn't a known property of 'form'. ("
	  <h4>{{ 'customer_settings.postbox.infos.title' | translate }}</h4>
	
	  <form [ERROR ->][formGroup]="postboxInfosForm" class="m-postbox-infos--form" *ngIf="!showNoDataNotification">

	      "): ng:///DynamicTestModule/PostboxInfosComponent.html@4:8
```

#### solution
see [stackoverflow](https://stackoverflow.com/a/39152110)
```javascript
	import { FormsModule, ReactiveFormsModule } from '@angular/forms';
	// ..
	TestBed.configureTestingModule({
	      declarations: [ ... ],
	      imports: [ FormsModule, ReactiveFormsModule ],
	})
```



<a name="staticinjectorerror-dynamictestmodule-unknown-service"></a>

### error: "StaticInjectorError(DynamicTestModule)[PostboxInfosComponent -> HttpService]" [↸](#toc)

* This issue is for all services...
* see ```src/app/base/main/customer-settings/postbox/postbox-list/postbox-infos/postbox-infos.component.spec.ts```

#### solution
```javascript
	// ...
	// class MockHttpService extends HttpService {
	class MockUserSettingsHttpService {
	  getLocationList(): Observable<Array<String>> {
	    return Observable.of(['England', 'Deutschland']);
	  }
	}

	// ...
	    TestBed.configureTestingModule({
	      declarations: [ ... ],
	      providers: [
	        { provide: HttpService, useClass: MockHttpService },
		// ...
	      ],
	      imports: [ ..., HttpClientTestingModule ],
	      schemas: [ NO_ERRORS_SCHEMA ],
	    }))
```



<a name="cannot-read-property-xy-of-undefined"></a>

### error: "TypeError: Cannot read property 'id' of undefined" [↸](#toc)

* This issue is for all properties and needed values...
* see ```src/app/base/main/customer-settings/postbox/postbox-list/postbox-infos/postbox-infos.component.spec.ts```

#### solution
	id wurde in der zu testenden Komponente mehrfach verwendet und musste dementsprechend gesetzt werden:
	u.a. ein input setter (activeRow) musste im Test gesetzt werden

```javascript
	component.activeRow = {
		id: 96,
		name: 'user@test.de',
		type: 2,
		status: 0,
		is_billed: 1,
		actionCssClasses: '',
		actionsOpen: true,
	};
```

#### solution
	eine httpService Methode musste mit einem entsprechenden Rückgabewert gemockt werden:
```javascript
	class MockHttpService {
		getLocationList(): Observable<Array<Location>> {
			return Observable.of([{id: 1, value: 'DE', long: 'Deutschland'}]);
		}
		// ...
	}
```

<a name="technologies-used-in"></a>

## Technologies used in [↸](#toc)
__spec__ | __foo__
--- | ---
`src/app/base/main/customer-settings/postbox/postbox-list/postbox-infos/postbox-infos.component.spec.ts` | ReactiveForm, FormGroup, Translation pipe, HttpService, ConfigService, UserService, NotifyService
