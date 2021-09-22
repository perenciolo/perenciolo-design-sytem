import { Spacing } from '@perenciolo-design-system/foundation';
import classes from '@perenciolo-design-system/scss/lib/margin.module.css';
import classnames from 'classnames';
import React, { useEffect } from 'react';

interface MarginProps {
  children: React.ReactNode
  space?: keyof typeof Spacing
  side?: 'top' | 'right' | 'bottom' | 'left' | 'none' | 'all' 
}


function Margin({ space = 'md', side='all', children }:MarginProps) {
   const className= classnames({
    [`dse-margin-${side}`]: side === 'none',
    [`dse-margin-${space}`]: side === 'all',
    [`dse-margin-${side}-${space}`]: side !=='all' && side !== 'none'
  })
  useEffect(()=>{ console.log(className)},[])
  return (<div className={classes[className as keyof typeof classes]}>{children}</div>)
}

export default Margin