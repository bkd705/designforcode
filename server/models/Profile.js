import Bookshelf from '../config/Bookshelf'

const Profile = Bookshelf.Model.extend({
  tableName: 'profiles',
  uuid: true,
  hasTimestamps: false,
  user() {
    return this.belongsTo('User', 'user_id', 'id')
  }
})

/**
 * Returns the rules for validation
 * @param required - If the fields should be required
 */
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

/**
 * Create a profile
 * @param info - Information to create a profile
 */
Profile.create = async (info) => {
  return await (new Profile(info)).save()
}

/**
 * Find a profile by user ID
 * @param userId - User identifier
 * @param opts - Options for the fetch
 */
Profile.find = async (userId, opts = {}) => {
  return await Profile.where('user_id', userId).fetch(opts)
}

/**
 * Update a profile
 * @param profile - Profile model to update
 * @param info - Information to update with
 */
Profile.update = async (profile, info) => {
  return await profile.save(info)
}

/**
 * Delete a profile
 * @param profile - Profile to delete
 */
Profile.delete = async (profile) => {
  return await profile.destroy()
}

export default Bookshelf.model('Profile', Profile)
