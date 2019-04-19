import React, { FunctionComponent } from 'react';
import cx from 'classnames';

import './Input.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label?: string;
};

const Input: FunctionComponent<Props> = ({ label, className, ...rest }) => {
  const classNames = cx('Input-Input', className);

  return (
    <div className="Input-Group">
      <label className="Input-Label">{label}</label>
      <input className={classNames} {...rest} />
    </div>
  );
};

export default Input;
