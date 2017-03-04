import React, { PropTypes as P } from 'react'

const InputField = ({ label, name, value, type, placeholder, onChange, onBlur, error }) => {
  return (
    <div className="input-field">
      <label htmlFor={name} className="label">{label}</label>
      <p className="control">
        <input 
          type={type} 
          name={name}
          value={value}
          className="input" 
          placeholder={placeholder} 
          onChange={onChange}
          onBlur={onBlur}
        />
      </p>
      { error ? <span className="icon is-small"><i className="fa fa-warning"></i></span> : '' }
      { error ? <span className="help is-danger">{error}</span> : '' }
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