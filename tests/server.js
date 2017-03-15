// Required to compile es7 code
require("babel-core/register")
require("babel-polyfill")

// Set environment
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

// Save request
let request = chai.request(server)

// Global variables
let token = null
let userId = null
let postId = null
let commentId = null
let commentId2 = null

describe('User', () => {
  let user = {
    username: 'test',
    email: 'email@gmail.com',
    password: 'test-pass'
  }

  let updateUser = {
    email: 'email2@gmail.com'
  }

  let updateProfile = {
    first_name: 'firstname',
    last_name: 'lastname',
    profession: 'developer',
    skill_level: 'beginner',
    description: 'test description'
  }

  let updatePassword = {
    oldPassword: 'test-pass',
    newPassword: 'test-pass2'
  }

  it('Create user', (done) => {
    request
      .post('/user/create')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully created user!')
        res.body.data.should.have.property('user')
        res.body.data.should.have.property('token')

        // Set user
        token = res.body.data.token
        userId = res.body.data.user.id
        done()
    })
  })

  it('Find user', (done) => {
    request
      .get('/user/' + userId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully fetched user!')
        res.body.data.should.have.property('user')
        res.body.data.should.have.property('profile')
        done()
    })
  })

  it('Update user', (done) => {
    request
      .put('/user/' + userId)
      .set('Authorization', 'Bearer ' + token)
      .send(updateUser)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully updated user!')
        res.body.data.should.have.property('user')
        res.body.data.user.email.should.equal(updateUser.email)
        done()
    })
  })

  it('Update user profile', (done) => {
    request
      .put('/user/' + userId + '/profile')
      .set('Authorization', 'Bearer ' + token)
      .send(updateProfile)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully updated user profile!')
        res.body.data.should.have.property('user')
        res.body.data.should.have.property('profile')

        res.body.data.profile.first_name.should.equal(updateProfile.first_name)
        res.body.data.profile.last_name.should.equal(updateProfile.last_name)
        res.body.data.profile.profession.should.equal(updateProfile.profession)
        res.body.data.profile.skill_level.should.equal(updateProfile.skill_level)
        res.body.data.profile.description.should.equal(updateProfile.description)
        done()
    })
  })

  it('Update user password', (done) => {
    request
      .put('/user/' + userId + '/password')
      .set('Authorization', 'Bearer ' + token)
      .send(updatePassword)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully updated user password!')
        done()
    })
  })

  it('Login with new password', (done) => {
    let fields = {
      username: user.username,
      password: updatePassword.newPassword
    }

    request
      .post('/auth/login')
      .send(fields)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully logged in!')
        res.body.data.should.have.property('user')
        res.body.data.should.have.property('token')
        done()
    })
  })
})

describe('Post', () => {
  let post = {
    title: 'new post',
    description: 'test description',
    type: 'code'
  }

  let updatePost = {
    description: 'new description'
  }

  it('Create post', (done) => {
    request
      .post('/post/create')
      .set('Authorization', 'Bearer ' + token)
      .send(post)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully created post!')
        res.body.data.should.have.property('post')

        postId = res.body.data.post.id
        done()
    })
  })

  it('Update post', (done) => {
    request
      .put('/post/' + postId)
      .set('Authorization', 'Bearer ' + token)
      .send(updatePost)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully updated post!')
        res.body.data.should.have.property('post')
        res.body.data.post.description.should.equal(updatePost.description)
        done()
    })
  })

  it('Find post', (done) => {
    request
      .get('/post/' + postId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully fetched post!')
       done()
    })
  })
})

describe('Comment', () => {
  let comment = {
    body: 'test comment',
    post_id: postId
  }

  let updateComment = {
    body: 'updated comment'
  }

  it('Create comment #1', (done) => {
    // Must do this because 'describe' happens pre-test.
    // Will be null otherwise
    comment.post_id = postId

    request
      .post('/comment/create')
      .set('Authorization', 'Bearer ' + token)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully created comment!')
        res.body.data.should.have.property('comment')

        commentId = res.body.data.comment.id
        done()
    })
  })

  it('Create comment #2', (done) => {
    request
      .post('/comment/create')
      .set('Authorization', 'Bearer ' + token)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully created comment!')
        res.body.data.should.have.property('comment')

        commentId2 = res.body.data.comment.id
        done()
    })
  })

  it('Update comment #1', (done) => {
    request
      .put('/comment/' + commentId)
      .set('Authorization', 'Bearer ' + token)
      .send(updateComment)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully updated comment!')
        res.body.data.should.have.property('comment')
        res.body.data.comment.body.should.equal(updateComment.body)
        done()
    })
  })

  it('Find comment #1', (done) => {
    request
      .get('/comment/' + commentId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully fetched comment!')
        res.body.data.should.have.property('comment')
        done()
    })
  })
})

describe('Deletions', () => {
  it('Delete comment #2', (done) => {
    request
      .delete('/comment/' + commentId2)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully deleted comment!')
        done()
    })
  })

  it('Delete post', (done) => {
    request
      .delete('/post/' + postId)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal('Successfully deleted post!')
        done()
    })
  })

  it("Find comment from deleted post (shouldn't be there)", (done) => {
    request
      .get('/comment/' + commentId)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.success.should.equal(false)
        res.body.error.should.equal('Failed to find comment!')
        done()
    })
  })
})
