import React, { PropTypes as P } from 'react'
import classnames from 'classnames'

const InputField = ({ label, name, value, type, options, placeholder, onChange, onBlur, error, helper }) => {
  return (
    <div className="field">
      { label && <label htmlFor={name} className='label'>{label}</label> }
      <p className={classnames('control', { 'has-icon has-icon-right': error || helper })}>
        <span className="select">
          <select
            type={type}
            name={name}
            value={value}
            className={classnames('', { 'is-danger': error, 'is-success': helper })}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
          >
            { options.map((option, key) => {
              return <option value={option.toLowerCase()} key={key}>{option}</option>
            })}
          </select>
        </span>
        { error && <span className='icon is-small'><i className='fa fa-warning' /></span> }
        { error && <span className='help is-danger'>{error}</span> }

        { helper && <span className='icon is-small'><i className='fa fa-check' /></span> }
        { helper && <span className='help is-success'>{helper}</span> }
      </p>
    </div>
  )
}

InputField.propTypes = {
  label: P.string,
  name: P.string.isRequired,
  value: P.string.isRequired,
  type: P.string.isRequired,
  options: P.array.isRequired,
  placeholder: P.string,
  onChange: P.func.isRequired,
  onBlur: P.func,
  error: P.string
}

InputField.defaultProps = {
  type: 'text'
}

export default InputField
