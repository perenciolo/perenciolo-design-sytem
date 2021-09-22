import { select, text } from "@storybook/addon-knobs";
import React from "react";
import Color from './Color';


export default {
  title: 'Atoms|Color'
}

export const Common = () => <Color hexCode={text('HexCode', 'rebeccapurple')} />
export const CustomDimensions = () => <Color hexCode={text('HexCode', 'rebeccapurple')} className={select('ClassName', ['some-class', 'other-one', 'other'], 'some-class')}/>