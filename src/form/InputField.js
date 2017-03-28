import React, { PropTypes as P } from 'react'
import classnames from 'classnames'

const InputField = ({ label, name, value, type, placeholder, onChange, onBlur, error, autocomplete, helper }) => {
  return (
    <p className={classnames('control is-expanded', { 'has-icon has-icon-right': error || helper })}>
      <input
        type={type}
        name={name}
        value={value}
        className={classnames('input', { 'is-danger': error, 'is-success': helper })}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autocomplete}
      />
      { error && <span className='icon is-small'><i className='fa fa-warning' /></span> }
      { error && <span className='help is-danger'>{error}</span> }

      { helper && <span className='icon is-small'><i className='fa fa-check' /></span> }
      { helper && <span className='help is-success'>{helper}</span> }
    </p>
  )
}

InputField.propTypes = {
  label: P.string,
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
