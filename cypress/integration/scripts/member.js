/// <reference types="Cypress" />

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage.getItem(key);
    console.log(key, localStorage.getItem(key));
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    console.log(key);
  });
});

context('Cypress.Commands', () => {

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('login to demo-hankhee', () => {
    cy.visit('https://demo-hankhee.herokuapp.com');

    cy.get('a[href="/home"]').click();

    cy.get('#name').clear().type('user121');
    cy.get('#password').clear().type('pass121');

    cy.get('button:contains("Login")').click().wait(2000);

    cy.get('button:contains("Logout")').should('exist');
  })

  it('check members exists - 5', () => {
    cy.get('a[href="/members"]').click();

    cy.get('button.btn.btn-danger')
    .should($deleteButtoms => {
      expect($deleteButtoms).length(5);
    });
  })

  it('add new member', () => {
    cy.get('button:contains("Add new")').click().wait(2000);
    cy.get('#name').type("Ronaldo");
    cy.get('#emai').type("ronaldo@email.com");
    cy.get('#phone').type("001-22301323");
    cy.get('#website').type("www.ronaldo.com");
    cy.get('button:contains("Save")').click().wait(2000);
  })

  it('check newly added member', () => {
    cy.get('a[href="/members"]').click();

    cy.get('button.btn.btn-danger')
    .should($deleteButtoms => {
      expect($deleteButtoms).length(6);
    });
  })

  it('Update record', () => {
    cy.get('a:contains("Ronaldo")').click().wait(2000);
    cy.get('#name').clear().type("Messi");
    cy.get('#emai').clear().type("messi@hotmail.com");
    cy.get('#website').clear().type("www.messi.com");

    cy.get('button:contains("Save")').click().wait(2000);
  })

  it('check newly update member', () => {
    cy.get('a:contains("Messi")').should('exist');
    cy.get('div:contains("messi@hotmail.com")').should('exist');
    cy.get('div:contains("www.messi.com")').should('exist');
  })

  it('delete Messi member', () => {
    cy.get('a[href="/members"]').click();
    cy.get('button.btn.btn-danger').should($deleteButtoms => {
      $deleteButtoms[0].click();
      
    });
    cy.get('button:contains("Yes")').click();
    cy.wait(1000);
    cy.get('button.btn.btn-danger')
    .should($deleteButtoms => {
      expect($deleteButtoms).length(5);
    });
  })


})
