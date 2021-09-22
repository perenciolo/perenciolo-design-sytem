import { Margin, Select } from "@perenciolo-design-system/react";
import React from "react";
import ReactDOM from "react-dom";

const options = [{
  label: 'Hola',
  value: 'hola',
},
{
  label: 'Que tal',
  value: 'quetal',
},
{
  label: 'Open',
  value: 'open',
}]

ReactDOM.render(
  <Margin>
    <Select options={options} />
  </Margin>,
  document.querySelector('#root')
)