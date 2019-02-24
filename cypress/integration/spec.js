/* eslint-env mocha */
/* global cy */
/// <reference types="Cypress" />

describe('HackerNews', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads', () => {
    cy.contains('Built with Vue.js')
  })

  it('loads more than 10 news items', () => {
    cy.get('.news-item').should('have.length.gt', 10)
  })
  
  it('goes to seconds page and back', () => {
    cy.contains('.news-list-nav a', 'more >').click()
    cy.url().should('contain', '/top/2')
    cy.go('back')
    cy.url().should('contain', '/top')
  })

  it('cannot go to previous page', () => {
    cy.contains('.news-list-nav a', '< prev').should('have.class', 'disabled')
  })

  it('goes to comments and back', () => {
    // see comments for first story
    cy.get('.news-item')
      .first().find('.meta .comments-link')
      .click()
    // loader disappears and comments show
    cy.get('.item-view-comments-header .spinner').should('not.be.visible')
    // may have zero comments
    cy.get('.comments')
      .should('have.length.gte', 0)
      .and('be.visible')
    // go to the top news
    cy.get('nav').contains('Top').click()
    cy.url().should('contain', '/top')
  })
})