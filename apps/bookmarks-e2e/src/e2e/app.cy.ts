import { getHeader } from '../support/app.po';

describe('bookmarks', () => {
  beforeEach(() => cy.visit('http://localhost:4200/'));

  it('should render', () => {
    getHeader().contains('Bookmarks');
  });
});
