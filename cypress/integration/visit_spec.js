/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/// <reference types="cypress" />

const classNameStartWith=(name)=>`div[class^='${name}']`;

describe('E2E Test', () => {
    
    it('visit',()=>{
        cy.visit('http://localhost:3000')
        .get('.buttonMenu')
        .should('have.class', 'buttonMenu')
        
        cy.get('.buttonMenu').click()
        .get('.autocomplete-input')
        .type('Санкт')
        .get('.suggestion-item')
        .should('have.text', 'Санкт-Петербург')
        .click()
        .get(classNameStartWith('city-table'))
        .get(classNameStartWith('city-table_cityLine'))
        .get(classNameStartWith('city-table_name'))
        .get(classNameStartWith('city-table_temp'))
        .click()
        .get(classNameStartWith('city-weather_city'))
        .should('have.text', 'Санкт-Петербург')
        .get(classNameStartWith('city-weather_weatherInfo'))
        .get(classNameStartWith('hourly-forecast_hourlyForecast'))
        .get(classNameStartWith('daily-forecast_dailyForecast'))
    })
  })