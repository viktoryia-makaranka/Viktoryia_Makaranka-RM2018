describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })

  it('Visits my repository', () => {
    cy.visit('https://viktoryia-makaranka.github.io/Viktoryia_Makaranka-RM2018/')
  })

  it('Enter search text', () => {
    cy.get('.search__input')
      .type('BIG HERO 6')
      .should('have.value', 'BIG HERO 6')
  })

  it('Click search button', () => {
    cy.get('.search__button')
      .click()
  })
})