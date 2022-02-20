const { selectors } = require("../support/resources/selectors")

describe('Basic Giphy Validations', () => {

    before(() => {
        cy.visit(Cypress.env('baseUrl'))
    })


    it("validates that its on the correct website", () => {

        // Get location and validate its giphy.com
        cy.location('origin').should('eq', Cypress.env('baseUrl'))

    })

    it("validates that search returns valid results", () => {

        const search_query = 'black'

        //type a search query and type Enter key
        cy.get(selectors.home.searchInput).type(search_query).type("{enter}")
        cy.get(selectors.home.searchQueryHeading).should('include.text', search_query)
        cy.get(selectors.home.headingCount).then(($count) => {
            let count = $count.attr("data-gif-count")
            // Remove comma
            count = parseFloat(count.replace(/,/g,''))

            expect(count).to.be.at.least(1)
            
        })
        cy.get(selectors.home.listGif).should('be.visible')
    })
    
    it("should upload a file successfully", () => {
        cy.get(selectors.home.uploadBtn)
    })

})