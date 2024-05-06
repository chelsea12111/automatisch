import * as React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';

function ControlledCheckbox(props) {
  const { control } = useFormContext();
  const {
    name,
    defaultValue = false,
    disabled = false,
    onBlur,
    onChange,
    dataTest,
    required,
    ...checkboxProps
  } = props;

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={{ required }}
      render={({ field: { onChange: controllerOnChange, value, ...field } }) => {
        return (
          <Checkbox
            {...checkboxProps}
            {...field}
            checked={!!value}
            disabled={disabled}
            onChange={(event) => {
              controllerOnChange(event.target.checked);
              onChange?.(event);
            }}
            onBlur={(event) => {
              controllerOnBlur(event);
              onBlur?.(event);
            }}
            inputRef={field.ref}
            data-test={dataTest}
          />
        );
      }}
    />
  );
}

ControlledCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool,
  dataTest: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

export default ControlledCheckbox;
