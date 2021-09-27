import React, {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react'

type MyButtonProps<T extends ElementType> = {
  as?: T
  children: ReactNode
}

function Button<T extends ElementType = 'button'>({ as, children, ...props }: MyButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof MyButtonProps<T>>) {
  const Component = as || 'button'
  return <Component {...props}>
    {children}
  </Component>
}

export default Button