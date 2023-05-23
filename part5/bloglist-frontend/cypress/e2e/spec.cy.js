// describe('Blog app', function () {
//   beforeEach(function () { cy.visit('http://localhost:3000') })

//   it('front page can be opened', function () {
//     cy.contains('Blog App')
//     cy.contains('login')
//   })

//   it('login form can be opened', function () {
//     cy.contains('login').click()
//   })

//   it('the user can log in', function () {
//     cy.contains('login').click()
//     cy.get('#username').type('root')
//     cy.get('#password').type('root')

//     cy.get('#login-button').click()
//   })
// })
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { name: 'Superuser', username: 'root', password: 'root' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blog App')
    cy.contains('login')
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.get('#login-button').click()
  })

  describe('when logged in', function () {
    // ...
  })
})