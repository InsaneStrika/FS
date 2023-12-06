describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      "username": "Testi123",
      "name": "Testi",
      "password": "testisalasana"
    }
    cy.request('POST', 'http://localhost:3001/api/users', user).then(response=>{
      cy.visit('http://localhost:5173')
    })
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Testi123')
      cy.get('#password').type('testisalasana')
      cy.get('#login-button').click()

      cy.contains('Testi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Testi123')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        "username": "Testi123",
        "password": "testisalasana"
      }
      cy.request('POST', 'http://localhost:3001/api/login', user).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Component testing is done with react-testing-library')
      cy.get('#author').type('Elon Ma')
      cy.get('#url').type('x.com')

      cy.contains('Save').click()
      cy.contains('Component testing is done with react-testing-library - Elon Ma')
    })

    describe('When blog added', function(){
      beforeEach(function() {
        cy.contains('New blog').click()
        cy.get('#title').type('Component testing is done with react-testing-library')
        cy.get('#author').type('Elon Ma')
        cy.get('#url').type('x.com')
  
        cy.contains('Save').click()
      })


    it('User can like a blog', function() {
      cy.contains('Component testing is done with react-testing-library - Elon Ma')

      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    it('The blog creator can delete the blog', function() {
      cy.contains('View').click()
      cy.contains('Delete').click()
      cy.get('html').should('not.contain', 'Component testing is done with react-testing-library - Elon Ma')
    })

    it('Other users do not see the Delete-button', function() {
      cy.contains('Logout').click()
      const user = {
        "username": "Otheruser",
        "name": "Other",
        "password": "salasana"
      }
      cy.request('POST', 'http://localhost:3001/api/users', user).then(response=>{
        cy.visit('http://localhost:5173')
        cy.get('#username').type('Otheruser')
        cy.get('#password').type('salasana')
        cy.get('#login-button').click()
        cy.contains('Component testing is done with react-testing-library - Elon Ma')
        cy.contains('View').click()
        cy.get('html').should('not.contain', 'Delete')
      })
    })

    describe('When multiple blogs added', function(){
      beforeEach(function() {
        cy.get('#addblog').click()
        cy.get('#title').type('Blog2')
        cy.get('#author').type('Elon Ma')
        cy.get('#url').type('x.com')
  
        cy.contains('Save').click()

        cy.contains('Blog2 - Elon Ma').parent().parent().as('blog2')
      })

      it('Blogs are sorted by likes', function() {
        cy.get('@blog2').contains('View').click()
        cy.get('@blog2').contains('Like').click()
        cy.get('.default').eq(0).should('contain', 'Blog2')
        
      })

    })
  })
  })
})
