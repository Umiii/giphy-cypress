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
        cy.get(selectors.homePage.searchInput).type(search_query).type("{enter}")
        cy.get(selectors.homePage.searchQueryHeading).should('include.text', search_query)
        cy.get(selectors.homePage.headingCount).then(($count) => {
            let count = $count.attr("data-gif-count")
            // Remove comma
            count = parseFloat(count.replace(/,/g,''))

            expect(count).to.be.at.least(1)
            
        })
        cy.get(selectors.homePage.listGif).should('be.visible')
    })
    
    it("should upload a file successfully", () => {
       
        cy.get(selectors.homePage.username).click()
        cy.get(selectors.homePage.email).type("umy.ikem@gmail.com")
        cy.get(selectors.homePage.password).type("born1983$$")
        cy.contains('Log in').click()
        cy.get(selectors.homePage.uploadBtn).click()
        cy.get(selectors.uploadPage.inputFile).selectFile('cypress\\fixtures\\rand.gif')
        cy.get(selectors.uploadPage.downloadBtn).eq(0).click().then(($download_btn) => {
            cy.get(selectors.uploadPage.uploadSuccessMessage).should('exist')
        })
       
        // attachFile({filePath: "rand.gif", encoding: 'utf-8'})  
                  

    })

})