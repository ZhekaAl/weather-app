/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/// <reference types="cypress" />

const classNameStartWith = (name) => `div[class^='${name}']`;
const inputClassNameStartWith = (name) => `input[class^='${name}']`;
const liClassNameStartWith = (name) => `li[class^='${name}']`;

describe('E2E Test', () => {

    it('visit', () => {
        cy.visit('http://localhost:3000')
            .get('.buttonMenu')
            .first()
            .should('have.class', 'buttonMenu')


        cy.get('.button-about').first().click()


        cy.get(inputClassNameStartWith('inputText'))
            .type('Санкт')
            .get(liClassNameStartWith('suggestionElement'))
            .should('have.text', 'Санкт-Петербург')
            .click()

        cy.wait(3000)

        cy.get(classNameStartWith('cityLine'))
            .eq(1)
            .get(classNameStartWith('name'))
            .get(classNameStartWith('temp')).eq(1)
            .click()

        cy.wait(500)

        // cy.get(classNameStartWith('city'))
        //     .should('have.text', 'Санкт-Петербург')

        cy.get(classNameStartWith('weatherInfo'))
            .get(classNameStartWith('hourlyForecast'))
            .get(classNameStartWith('dailyForecast'))

        cy.get(`${classNameStartWith('weather')}>${classNameStartWith('city')}`)
            .should('have.text', 'Санкт-Петербург')

    })
})