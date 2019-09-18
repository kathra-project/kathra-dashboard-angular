import { AngularCliWebpackPage } from './app.po';

describe('angular-cli-webpack App', () => {
  let page: AngularCliWebpackPage;

  beforeEach(() => {
    page = new AngularCliWebpackPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
