import { NgxAuth0Page } from './app.po';

describe('ngx-auth0 App', () => {
  let page: NgxAuth0Page;

  beforeEach(() => {
    page = new NgxAuth0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
