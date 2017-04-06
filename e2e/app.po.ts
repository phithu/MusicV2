import { browser, element, by } from 'protractor';

export class MusicPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pt-root h1')).getText();
  }
}
