import React from 'react'

interface ColorProps {
  hexCode: string
  className?: string
}

function Color({hexCode, className=''}:ColorProps) {
    return (<div className={className} style={{
      backgroundColor: hexCode
    }}/>)
}

export default Color