describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { name: 'Superuser', username: 'root', password: 'root' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login',function(){
    it('succeeds with correct credentials',function(){
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      cy.contains('Superuser logged in.')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('notroot')
      cy.get('#password').type('notroot')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      cy.contains('Superuser logged in.')
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('input[name="title"]').type('title')
      cy.get('input[name="author"]').type('author')
      cy.get('input[name="url"]').type('url')
      cy.get('button[type="submit"]').contains('Create').click()
      cy.wait(1000)
      cy.contains('title by author')
    })

    it('Users can like a blog.',function(){
      cy.contains('New blog').click()
      cy.get('input[name="title"]').type('title')
      cy.get('input[name="author"]').type('author')
      cy.get('input[name="url"]').type('url')
      cy.get('button[type="submit"]').contains('Create').click()
      cy.wait(1000)
      cy.contains('title by author')
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.wait(1000)
      cy.contains('Likes: 1')
    })
    it('User who created a blog can delete it.',function(){
      cy.contains('New blog').click()
      cy.get('input[name="title"]').type('title')
      cy.get('input[name="author"]').type('author')
      cy.get('input[name="url"]').type('url')
      cy.get('button[type="submit"]').contains('Create').click()
      cy.wait(1000)
      cy.contains('title by author')
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.wait(1000)
      cy.contains('h2','Blogs')
        .next()
        .should('not.exist')
    })
    it('Only the creator can see the delete button of a blog.', function () {
      cy.contains('New blog').click()
      cy.get('input[name="title"]').type('title')
      cy.get('input[name="author"]').type('author')
      cy.get('input[name="url"]').type('url')
      cy.get('button[type="submit"]').contains('Create').click()
      cy.wait(500)
      cy.contains('title by author')
      cy.contains('View').click()
      cy.contains('Remove')
      cy.contains('Logout').click()

      const user = { name: 'Guest', username: 'guest', password: 'guest' }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.wait(500)
      cy.contains('login').click()
      cy.get('#username').type('guest')
      cy.get('#password').type('guest')
      cy.get('#login-button').click()
      cy.contains('Guest logged in.')
      cy.contains('View').click()
      cy.contains('button', 'Remove').should('not.exist')
    })

    it('Blogs are ordered by likes in decreasing order',function(){
      cy.contains('New blog').click()
      cy.get('input[name="title"]').type('blog1')
      cy.get('input[name="author"]').type('author1')
      cy.get('input[name="url"]').type('url1')
      cy.get('button[type="submit"]').contains('Create').click()
      cy.wait(500)
      cy.contains('blog1 by author1')

      cy.contains('New blog').click()
      cy.get('input[name="title"]').type('blog2')
      cy.get('input[name="author"]').type('author2')
      cy.get('input[name="url"]').type('url')
      cy.get('button[type="submit"]').contains('Create').click()
      cy.wait(500)
      cy.contains('blog2 by author2')

      cy.get('.blog').eq(1).contains('View').click()
      cy.contains('Like').click()
      cy.wait(100)
      cy.contains('Like').click()

      cy.get('.blog').eq(0).should('contain', 'blog2 by author2')
      cy.get('.blog').eq(1).should('contain', 'blog1 by author1')

    })
  })
})
