import React from 'react'
import { connect } from 'react-redux'
import { addFlashMessage } from '../flashmessage/actions'
import { validateProfile } from '../util/FormValidations'
import TransformObj from '../util/TransformObj'
import InputField from '../form/InputField'
import TextArea from '../form/TextArea'
import SelectInput from '../form/SelectInput'
import Api from './api'
import './profile.css'

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: this.props.user.id,
      first_name: '',
      last_name: '',
      profession: '',
      skill_level: '',
      description: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid = () => {
    const { isValid, errors } = validateProfile(this.state)
    if(!isValid) {
      this.setState({
        errors: errors
      })
      return false
    }

    return true
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      errors: {}
    })
    if(this.isValid()) {
      Api.update(TransformObj(this.state, ['user_id', 'first_name', 'last_name', 'profession', 'skill_level', 'description']))
        .then(res => {
          if(res.success) {
            this.props.dispatch(addFlashMessage({ type: 'success', text: 'Profile updated successfully!!' }))
            this.context.router.push('/')
          } else {
            this.props.dispatch(addFlashMessage({ type: 'error', text: res.message }))
          }
        })
        .catch(err => {
          this.props.dispatch(addFlashMessage({ type: 'error', text: err }))
        })
    }
  }

  render() {
    const { first_name, last_name, profession, skill_level, description, errors } = this.state

    const isNewSubHeading = ( <h4 className="subtitle">Create your profile now to help other understand who you are and what you do!</h4> )
    const isUpdateSubHeading = ( <h4 className="subtitle">Update your profile!</h4> )

    return (
      <section className="section">
      <div className="container">
        <div className="columns">    
          <div className="column is-half is-offset-one-quarter">
            <div className="heading">
              <h3 className="title">Profile</h3>
              { this.props.isNew ? isNewSubHeading : isUpdateSubHeading}
            </div>
            <form onSubmit={this.onSubmit}>
              <label className="label">Name</label>
              <div className="field is-grouped">                  
                <InputField
                  name="first_name"
                  value={first_name}
                  placeholder="First Name"
                  onChange={this.onChange}
                  error={errors.first_name}
                />

                <InputField
                  name="last_name"
                  value={last_name}
                  placeholder="Last Name"
                  onChange={this.onChange}
                  error={errors.last_name}
                />
              </div>

              <div className="field is-grouped">
                <SelectInput
                  label="Profession"
                  name="profession"
                  value={profession}
                  placeholder="Profession"
                  onChange={this.onChange}
                  error={errors.profession}
                  options={['Designer', 'Developer']}
                />
                
                <SelectInput
                  label="Skill Level"
                  name="skill_level"
                  value={skill_level}
                  placeholder="Skill Level"
                  onChange={this.onChange}
                  error={errors.skill_level}
                  options={['Beginner', 'Intermediate', 'Advanced']}
                />
              </div>

              <div className="field">
                <label className="label">Description</label>
                <TextArea
                  name="description"
                  value={description}
                  placeholder="Talk about you a little!"
                  onChange={this.onChange}
                  error={errors.description}
                />
              </div>

              <div className="field">
                <p className="control">
                  <button className="button is-primary" type="submit">Save Profile</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    )
  }
}

ProfileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(ProfileForm)
