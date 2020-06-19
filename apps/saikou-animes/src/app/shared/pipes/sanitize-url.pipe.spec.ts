import { SanitizeURLPipe } from './sanitize-url.pipe';

describe('SanitizeURLPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeURLPipe();
    expect(pipe).toBeTruthy();
  });
});
