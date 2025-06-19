import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

fdescribe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set an error alert', () => {
    service.error('Error occurred', 'Something went wrong');

    expect(service.alert()).toEqual({
      type: 'ERROR',
      message: 'Error occurred',
      description: 'Something went wrong'
    });

    expect(service.isAlerted()).toBeTrue();
  });

  it('should set a success alert', () => {
    service.success('Operation successful', 'Everything worked fine');

    expect(service.alert()).toEqual({
      type: 'SUCCCESS',
      message: 'Operation successful',
      description: 'Everything worked fine'
    });

    expect(service.isAlerted()).toBeTrue();
  });

  it('should set a warning alert', () => {
    service.warn('Be careful', 'This is a warning');

    expect(service.alert()).toEqual({
      type: 'WARN',
      message: 'Be careful',
      description: 'This is a warning'
    });

    expect(service.isAlerted()).toBeTrue();
  });

  it('should clear the alert', () => {
    service.error('Temporary error');
    service.clearAlert();

    expect(service.alert()).toBeUndefined();
    expect(service.isAlerted()).toBeFalse();
  });
  
});

