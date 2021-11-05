import React, { useEffect, useState } from 'react';
import { formatToReadableTime, hours, minutes, seconds } from '../../../../../utils';

export const DurationInput: React.FC<{ value: number; onChange: (newValue: number) => void }> = (
  props,
) => {
  const [localValue, setLocalValue] = useState(formatToReadableTime(props.value));
  const [isValidationError, setIsValidationError] = useState(false);

  useEffect(() => {
    setLocalValue(formatToReadableTime(props.value));
  }, [props.value]);

  return (
    <span>
      {isValidationError && <div>Невалидное значение</div>}
      <input
        value={localValue}
        onChange={(e) => {
          const { value } = e.target;
          setLocalValue(value);

          const re = /^\d\d:\d\d:\d\d$/;

          if (!re.test(value)) {
            setIsValidationError(true);
            return;
          }

          setIsValidationError(false);

          const [hoursValue, minutesValue, secondsValue] = value
            .split(':')
            .map((v) => Number.parseInt(v, 10));

          props.onChange(seconds(secondsValue) + minutes(minutesValue) + hours(hoursValue));
        }}
      ></input>
    </span>
  );
};
