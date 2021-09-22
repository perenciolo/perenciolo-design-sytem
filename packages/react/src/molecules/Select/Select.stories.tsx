import { withA11y } from "@storybook/addon-a11y";
import React from 'react';
import Select from './Select';
import { SelectOption } from "./Select.types";


export default {
  title: 'Molecules|Select',
  decorators: [withA11y]
}

const options: SelectOption[] = [
  {
    label: 'Red',
    value: 'red'
  },
  {
    label: 'Rebecca\'s Purple',
    value: 'rebeccapurple'
  },
  {
    label: 'Black',
    value: 'black'
  }
]

export const Common = () => <Select options={options} />