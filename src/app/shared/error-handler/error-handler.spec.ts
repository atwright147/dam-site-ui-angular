import { CustomErrorHandler } from './error-handler';

describe('CustomErrorHandler', () => {
  let klass: CustomErrorHandler;

  beforeEach(() => {
    klass = new CustomErrorHandler();
  });

  it('should create an instance', () => {
    expect(new CustomErrorHandler()).toBeTruthy();
  });

  it('should log the error to the console', () => {
    const mockError = { message: 'Mock error message' };
    const consoleInfoSpy = spyOn(console, 'info');

    klass.handleError(mockError);

    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(consoleInfoSpy).toHaveBeenCalledWith(mockError);
  });
});
