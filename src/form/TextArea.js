import React, { PropTypes as P } from 'react'
import classnames from 'classnames'

const TextArea = ({ label, name, value, type, placeholder, onChange, onBlur, error, helper }) => {
  return (
    <div className='input-field'>
      <label htmlFor={name} className='label'>{label}</label>
      <p className={classnames('control', { 'has-icon has-icon-right': error || helper })}>
        <textarea
          type={type}
          name={name}
          value={value}
          className={classnames('textarea', { 'is-danger': error, 'is-success': helper })}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        ></textarea>
        { error ? <span className='icon is-small'><i className='fa fa-warning' /></span> : '' }
        { error ? <span className='help is-danger'>{error}</span> : '' }

        { helper ? <span className='icon is-small'><i className='fa fa-check' /></span> : '' }
        { helper ? <span className='help is-success'>{helper}</span> : '' }
      </p>
    </div>
  )
}

TextArea.propTypes = {
  label: P.string.isRequired,
  name: P.string.isRequired,
  value: P.string.isRequired,
  type: P.string.isRequired,
  placeholder: P.string,
  onChange: P.func.isRequired,
  onBlur: P.func,
  error: P.string
}

TextArea.defaultProps = {
  type: 'text'
}

export default TextArea
