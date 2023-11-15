/// <reference types ="cypress"/>
import { attribute, attribute } from './Attribute';
const attribute = new attribute()

Cypress.on( 'uncaught:exception', (error,Runnable)=> {
    return false;
});

let username='please enter your username';
let password='please enter your password';

describe('Trello Test Automation', () => {
    it('Should sign in, create, edit, move, and delete a card', () => {
      cy.visit('https://trello.com/login');
      cy.get('input[id="user"]').type(username);
      cy.get('input[id="password"]').type(password);
      cy.get('input[id="login"]').click();
  
      // Create a Card
      cy.visit('https://trello.com/yourboardurl');
      cy.get('.list').first().within(() => {
        cy.get('.js-add-a-card').click();
        cy.get('textarea').type('Trello Test{enter}');  //I create a card by name of Trello Test
        cy.get('.list-card-title').should('contain', 'Trello Test');
      });
  
      // Edit the Card
      cy.contains('Trello Test').click();
      cy.get('.js-edit-card-title').click();
      cy.get('textarea').clear().type('Edited Card{enter}');    //I edit the card by name of Edited Card
      cy.get('.js-card-details').should('contain', 'Edited Card');
      cy.get('.icon-lg.icon-close').click(); // Close the card
  
      // Move the Card
      cy.contains('Edited Card').trigger('dragstart');
      cy.get('.list:contains("Done")').trigger('drop');
      cy.get('.list:contains("Done") .list-card-details').should('contain', 'Edited Card');
  
      // Delete the Card
      cy.contains('Edited Card').click();
      cy.get('.js-archive-card').click();
      cy.get('.js-confirm').click();
      cy.get('.list-card-details').should('not.contain', 'Edited Card');
    });
  });

