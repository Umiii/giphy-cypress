describe('Basic Giphy Validations', () => {

    before(() => {
        cy.visit('https://giphy.com/')
    })


    it("validates that its on the correct website", () => {

        // Get location and validate its giphy.com
        cy.location().should((loc) => {
            expect(loc.toString()).to.eq("https://giphy.com/")
        })

    })

    it("validates that search returns valid results", () => {

        const search_query = 'black'

        //type a search query and type Enter key
        cy.get(".Input-sc-w75cdz").type(search_query).type("{enter}")
        cy.get(".Title-sc-1nnws5s").should('include.text', search_query)
        cy.get(".Title-sc-1nnws5s > span").then(($count) => {
            let count = $count.attr("data-gif-count")
            // Remove comma
            count = parseFloat(count.replace(/,/g,''))

            expect(count).to.be.at.least(1)
            
        })
        cy.get('.giphy-gif').should('be.visible')
    })
    
    it("should upload a file successfully", () => {
        
    })

})