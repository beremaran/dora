import React, { FunctionComponent } from 'react';
import Input from '../Input';

type Props = JSX.IntrinsicElements['input'] & {
  label?: string;
};

const CheckboxInput: FunctionComponent<Props> = ({ label, ...rest }) => (
  <Input type="checkbox" label={label} {...rest} />
);

export default CheckboxInput;
