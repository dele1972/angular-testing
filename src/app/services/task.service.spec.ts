import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created - NEW', () => {
    const service: TaskService = TestBed.get(TaskService);
    // expect(service).toBeTruthy();
    expect(service).toBeDefined();
  });
});
