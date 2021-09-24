import { Spacing } from '@perenciolo-design-system/foundation';
import classes from '@perenciolo-design-system/scss/lib/margin.module.css';
import classnames from 'classnames';
import React, { useEffect } from 'react';
import { capitalize } from '../../utils';

interface MarginProps {
  children: React.ReactNode
  space?: keyof typeof Spacing
  side?: 'top' | 'right' | 'bottom' | 'left' | 'none' | 'all' 
}


function Margin({ space = 'md', side='all', children }:MarginProps) {
  const sideSpaceKey = `pMargin${capitalize(side)}${capitalize(space)}`as keyof typeof classes
  const sideAllKey = `pMargin${capitalize(space)}` as keyof typeof classes

  const className= classnames({
    [classes.pMarginNone]: side === 'none',
    [classes[sideAllKey]]: side === 'all',
    [classes[sideSpaceKey]]: side !=='all' && side !== 'none'
  })

  useEffect(()=>{ console.log(className)},[])

  return (<div className={className}>{children}</div>)
}

export default Margin