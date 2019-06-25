import { Task } from './task.model';

describe('Task.Model', () => {
  it('should create an instance', () => {
    expect(new Task('d', 'd', true)).toBeTruthy();
  });
});
