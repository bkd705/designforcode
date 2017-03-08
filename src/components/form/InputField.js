import React, { PropTypes as P } from 'react'
import classnames from 'classnames'

const InputField = ({ label, name, value, type, placeholder, onChange, onBlur, error, helper }) => {
  return (
    <div className='input-field'>
      <label htmlFor={name} className='label'>{label}</label>
      <p className={classnames('control', { 'has-icon has-icon-right': error || helper })}>
        <input
          type={type}
          name={name}
          value={value}
          className={classnames('input', { 'is-danger': error, 'is-success': helper })}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        { error ? <span className='icon is-small'><i className='fa fa-warning' /></span> : '' }
        { error ? <span className='help is-danger'>{error}</span> : '' }

        { helper ? <span className='icon is-small'><i className='fa fa-check' /></span> : '' }
        { helper ? <span className='help is-success'>{helper}</span> : '' }
      </p>
    </div>
  )
}

InputField.propTypes = {
  label: P.string.isRequired,
  name: P.string.isRequired,
  value: P.string.isRequired,
  type: P.string.isRequired,
  placeholder: P.string,
  onChange: P.func.isRequired,
  onBlur: P.func,
  error: P.string
}

InputField.defaultProps = {
  type: 'text'
}

export default InputField
