import React from 'react';

const formatDateToInput = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -1);

export const DateTimeInput: React.FC<{
  value: Date | number;
  onChange: (newValue: number) => void;
}> = (props) => {
  const dateToSet = typeof props.value === 'number' ? new Date(props.value) : props.value;

  return (
    <input
      type="datetime-local"
      value={formatDateToInput(dateToSet)}
      onChange={(e) => {
        const { value } = e.target;
        props.onChange(new Date(value).getTime());
      }}
    ></input>
  );
};
