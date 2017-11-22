import { DaycareFrontendPage } from './app.po';

describe('daycare-frontend App', function() {
  let page: DaycareFrontendPage;

  beforeEach(() => {
    page = new DaycareFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
