import { GitStarsPage } from './app.po';

describe('git-stars App', () => {
  let page: GitStarsPage;

  beforeEach(() => {
    page = new GitStarsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
