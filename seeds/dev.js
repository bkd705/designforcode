const uuidV4 = require('uuid/v4')
const bcrypt = require('bcrypt')

exports.seed = function(knex, Promise) {
  const userInfo = []
  const postInfo = []
  const commentInfo = []
  const password = bcrypt.hashSync('test-pass', 10)

  // Create user objects
  for (let username of usernames) {
    userInfo.push({
      id: uuidV4(),
      username: username,
      email: username + '@gmail.com',
      password: password,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  for (let post of posts) {
    // Choose random user
    const rnd = Math.floor((Math.random() * userInfo.length - 1) + 1)
    const user = userInfo[rnd]

    postInfo.push({
      id: uuidV4(),
      user_id: user.id,
      title: post.title,
      description: post.description,
      type: post.type,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  // Set amount of comments to make
  const amount = 40
  for (let i = 0; i < 20; i++) {
    const rnd = Math.floor((Math.random() * postInfo.length - 1) + 1)
    const rnd2 = Math.floor((Math.random() * userInfo.length - 1) + 1)
    const rnd3 = Math.floor((Math.random() * comments.length - 1) + 1)

    const post = postInfo[rnd]
    const user = userInfo[rnd2]
    const comment = comments[rnd3]

    commentInfo.push({
      id: uuidV4(),
      post_id: post.id,
      user_id: user.id,
      body: comment,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  // Deletes ALL existing entries
  return knex('comments').del()
    .then(() => knex('posts').del())
    .then(() => knex('users').del())
    .then(() => knex('users').insert(userInfo))
    .then(() => knex('posts').insert(postInfo))
    .then(() => knex('comments').insert(commentInfo))
}

const usernames = [
  'amandur', 'bkd705', 'equimper', 'itsprettyrocky', 'jordang', 'kpollich',
  'mauricio_m95', 'morganc92', 'shadow', 'zlshames', '16peak', 'albingroen',
  'alexa', 'alexdanault', 'aliksandur', 'amountonbrady', 'anddre', 'andrew',
  'anton', 'antong', 'anudle', 'apizzimenti', 'askee123', 'augustj', 'barackoarne',
  'brooksie', 'bu7ch', 'busterz', 'callum', 'carlosr', 'cashed', 'cblackmon', 'cezikos',
  'colinajd', 'cynical', 'dot404', 'dreamless', 'emilio', 'ericb', 'firestarter'
]

const comments = [
  'Looks like a great opportunity! Too bad I cant complete this task :(',
  'Hey! Im going to send you a private message. Really interested in this!',
  'Can you message me more information about this opportunity? Thanks',
  'Have you found someone for this task yet? If not, I would be interested',
  'How many hours do you think this should take?',
  'Know the guy personally! Does some great work!',
  'This person has done work for me in the past! Very trust worthy person',
  'Cool opportunity. Wish I could take it',
  'How many years of experience is needed for this?',
  'I have a design I need done. Can we do a swap?',
  'Do you think you could do some development for me in return?',
  'Awesome!',
  'Perfect!',
  'Yes, I can do that',
  'I wish I was more talented, you look like you could provide me with some cool stuff'
]

const posts = [
  {
    title: 'Developer needed for front-end work',
    description: 'Developer must need to know how to use Bootstrap',
    type: 'code'
  },
  {
    title: 'Designer needed for a logo',
    description: 'Designer must be well versed in photoshop',
    type: 'design'
  },
  {
    title: '3D logo needed',
    description: 'No requirements other than to be good at making 3D logos',
    type: 'design'
  },
  {
    title: 'Back-end API task',
    description: 'Developer must know how to create a basic CRUD API',
    type: 'code'
  },
  {
    title: 'NodeJS freelancing wanted!',
    description: 'Coding using ES6 is a must! BookshelfJS and KoaJS used',
    type: 'code'
  },
  {
    title: 'Sports team logo!',
    description: 'We need a new team logo for our beer league hockey team',
    type: 'design'
  },
  {
    title: 'Junior developer needed!',
    description: 'Junior developer is needed to complete a small task!',
    type: 'code'
  },
  {
    title: 'Senior developer needed for API backend',
    description: 'Developer with 5 years+ of experience needed',
    type: 'code'
  },
  {
    title: 'Website design needed!',
    description: 'Must be up to date with service-workers and other HTML 5 stuff',
    type: 'design'
  },
  {
    title: 'React components needed ASAP!',
    description: 'Developer must be fluent in React + Redux',
    type: 'code'
  },
  {
    title: 'Making a website for my church, need designer!',
    description: 'We need a logo designed as well as a landing page designed. Task should only take a few hours',
    type: 'design'
  },
  {
    title: 'VueJS developer needed for front-end SPA',
    description: 'Must be familiar with VueJS as well as VueX',
    type: 'code'
  },
  {
    title: 'Ember programmer needed',
    description: 'Developer must be fluent in Ember',
    type: 'code'
  },
  {
    title: 'Angular developer needed!',
    description: 'User must be straight retarded, since angular sux',
    type: 'code'
  },
  {
    title: 'Adobe InDesign designer needed for yearbook website',
    description: 'We are making an online year book',
    type: 'design'
  }
]
