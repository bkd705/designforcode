import Bookshelf from '../config/Bookshelf'

const Profile = Bookshelf.Model.extend({
  tableName: 'profiles',
  uuid: true,
  hasTimestamps: false,
  user() {
    return this.belongsTo('User', 'user_id', 'id')
  }
})

Profile.getRules = (required = false) => {
  let rules = {
    first_name: 'alpha|min:2|max:20',
    last_name: 'alpha|min:2|max:20',
    profession: 'in:developer,designer',
    skill_level: 'in:beginner,intermediate,advanced',
    description: 'string'
  }

  if (required) {
    for (let key of Object.keys(rules)) {
      rules[key] = 'required|' + rules[key]
    }
  }

  return rules
}

Profile.create = async (info) => {
  return await (new Profile(info)).save()
}

Profile.find = async (userId, opts = {}) => {
  return await Profile.where('user_id', userId).fetch(opts)
}

Profile.update = async (profile, info) => {
  return await profile.save(info)
}

Profile.delete = async (profile) => {
  return await profile.destroy()
}

export default Bookshelf.model('Profile', Profile)
