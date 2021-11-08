import React, { useEffect, useRef, useState } from 'react';
import './Input.scss';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';

export const Input = React.forwardRef<any, IInput>(
  (
    {
      label,
      placeholder,
      maxLength,
      value,
      onChange,
      onBlur,
      onkeypress,
      onkeyup,
      type,
      borderRadius,
      width,
      height,
      background,
      className,
      name,
      error,
      colorText,
      marginLabel,
      onKeyDown,
      showPassword = false,
      zIndex,
      titleAction,
      handleAction,
      isDisable,
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);

    return (
      <div className={`input`}>
        {label && (
          <p className="input__label" style={{ margin: `${marginLabel}` }}>
            {label}
          </p>
        )}
        <div style={{ position: 'relative' }}>
          <div
            className={`input__container ${className} ${
              isDisable ? 'input__container--disable' : ''
            }`}
            style={{ borderRadius, height, width, background, zIndex }}
          >
            <input
              placeholder={placeholder}
              name={name}
              maxLength={maxLength}
              onKeyPress={onkeypress}
              defaultValue={value}
              disabled={isDisable}
              onChange={onChange}
              style={{
                color: `${colorText}`,
              }}
              type={show ? 'input' : type}
              onBlur={onBlur}
              onKeyUp={onkeyup}
              ref={ref}
              autoComplete="off"
              onKeyDown={onKeyDown}
              className={showPassword ? 'input__input input__input--show' : 'input__input'}
            />
            {showPassword && (
              <div
                className="input__showPass"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? <BsFillEyeFill size={20} /> : <BsFillEyeSlashFill size={20} />}
              </div>
            )}
            {titleAction && (
              <div className="input__showPass" onClick={handleAction}>
                {titleAction}
              </div>
            )}
          </div>
          {error && <div className="input__error">{error}</div>}
        </div>
      </div>
    );
  },
);
