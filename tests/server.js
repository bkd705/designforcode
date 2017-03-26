// Required to compile es7 code
require("babel-core/register")
require("babel-polyfill")

// Set environment
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
const Responses = require('../server/util/Responses')
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
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.CREATE_USER_SUCCESS)
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
      .get('/api/v1/users/' + userId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.SHOW_USER_SUCCESS)
        res.body.data.should.have.property('user')
        res.body.data.should.have.property('profile')
        done()
    })
  })

  it('Update user', (done) => {
    request
      .put('/api/v1/users/' + userId)
      .set('Authorization', 'Bearer ' + token)
      .send(updateUser)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.UPDATE_USER_SUCCESS)
        res.body.data.should.have.property('user')
        res.body.data.user.email.should.equal(updateUser.email)
        done()
    })
  })

  it('Update user profile', (done) => {
    request
      .put('/api/v1/users/' + userId + '/profile')
      .set('Authorization', 'Bearer ' + token)
      .send(updateProfile)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.UPDATE_PROFILE_SUCCESS)
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
      .put('/api/v1/users/' + userId + '/password')
      .set('Authorization', 'Bearer ' + token)
      .send(updatePassword)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.UPDATE_PASSWORD_SUCCESS)
        done()
    })
  })

  it('Login with new password', (done) => {
    let fields = {
      username: user.username,
      password: updatePassword.newPassword
    }

    request
      .post('/api/v1/auth/login')
      .send(fields)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.LOGIN_SUCCESS)
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
      .post('/api/v1/posts')
      .set('Authorization', 'Bearer ' + token)
      .send(post)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.CREATE_POST_SUCCESS)
        res.body.data.should.have.property('post')

        postId = res.body.data.post.id
        done()
    })
  })

  it('Update post', (done) => {
    request
      .put('/api/v1/posts/' + postId)
      .set('Authorization', 'Bearer ' + token)
      .send(updatePost)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.UPDATE_POST_SUCCESS)
        res.body.data.should.have.property('post')
        res.body.data.post.description.should.equal(updatePost.description)
        done()
    })
  })

  it('Find post', (done) => {
    request
      .get('/api/v1/posts/' + postId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.SHOW_POST_SUCCESS)
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
      .post('/api/v1/comments')
      .set('Authorization', 'Bearer ' + token)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.CREATE_COMMENT_SUCCESS)
        res.body.data.should.have.property('comment')

        commentId = res.body.data.comment.id
        done()
    })
  })

  it('Create comment #2', (done) => {
    request
      .post('/api/v1/comments')
      .set('Authorization', 'Bearer ' + token)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.CREATE_COMMENT_SUCCESS)
        res.body.data.should.have.property('comment')

        commentId2 = res.body.data.comment.id
        done()
    })
  })

  it('Update comment #1', (done) => {
    request
      .put('/api/v1/comments/' + commentId)
      .set('Authorization', 'Bearer ' + token)
      .send(updateComment)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.UPDATE_COMMENT_SUCCESS)
        res.body.data.should.have.property('comment')
        res.body.data.comment.body.should.equal(updateComment.body)
        done()
    })
  })

  it('Find comment #1', (done) => {
    request
      .get('/api/v1/comments/' + commentId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.SHOW_COMMENT_SUCCESS)
        res.body.data.should.have.property('comment')
        done()
    })
  })
})

describe('Deletions', () => {
  it('Delete comment #2', (done) => {
    request
      .delete('/api/v1/comments/' + commentId2)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.DELETE_COMMENT_SUCCESS)
        done()
    })
  })

  it('Delete post', (done) => {
    request
      .delete('/api/v1/posts/' + postId)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.equal(true)
        res.body.message.should.equal(Responses.DELETE_POST_SUCCESS)
        done()
    })
  })

  it("Find comment from deleted post (shouldn't be there)", (done) => {
    request
      .get('/api/v1/comments/' + commentId)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.success.should.equal(false)
        res.body.error.should.equal(Responses.COMMENT_NOT_FOUND)
        done()
    })
  })
})
