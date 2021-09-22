import classes from '@perenciolo-design-system/scss/lib/Select.module.css'
import { default as classNames, default as classnames } from 'classnames'
import React, { createRef, KeyboardEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { KEY_CODES, RenderProps, SelectOption, SelectProps } from './Select.types'

function Select({
    label= 'Please select an option...',
    onSelectOption,
    options= [],
    renderProps
  }:SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const labelRef = useRef<HTMLButtonElement>(null)
  const [overlayTop, setOverlayTop] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null)
  const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState<number|null>(null)

  const handleSelectOption = useCallback((option: SelectOption, optionIndex:number)=> {
    setIsOpen(value => !value)
    onSelectOption && onSelectOption(option, optionIndex)
    setSelectedIndex(optionIndex)
    setIsOpen(false)
  },[onSelectOption, setIsOpen])

  const selectedOption = useMemo(()=>{
    if(selectedIndex===null) {
      return null;
    }
    return options[selectedIndex]
  },[selectedIndex])
  
  const caretClasses = useMemo(() => classNames({
    [classes['dse-select__caret']]: true,
    [classes['dse-select__caret--open']]: isOpen,
    [classes['dse-select__caret--closed']]: !isOpen
  }), [isOpen])

  const handleLabelClick = () => {
    setIsOpen(value => !value)
  }

  const highlightOption = useCallback((optionIndex: number|null)=>{
    setHighlightedIndex(optionIndex)
    if(optionIndex === null) {
      return
    }
    const ref = optionRefs[optionIndex]
    ref?.current?.focus()
  }, [setHighlightedIndex])
  
  const handleKeyDown: KeyboardEventHandler = useCallback((event)=> {
    event.preventDefault()
    if(![KEY_CODES.ENTER, KEY_CODES.DOWN_ARROW, KEY_CODES.SPACE].includes(event.key as KEY_CODES)) {
      return
    }
    setIsOpen(true)
    highlightOption(0)
  }, [setIsOpen, highlightOption])

  const handleOptionKeyDown: KeyboardEventHandler = useCallback((event) => {
    if(event.key === KEY_CODES.ESC) {
      setIsOpen(false)
      return
    }
    if(event.key === KEY_CODES.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex, options))
    }
    if(event.key === KEY_CODES.UP_ARROW) {
      highlightOption(getPrevOptionIndex(highlightedIndex, options))
    }
    if(event.key === KEY_CODES.ENTER && highlightedIndex !== null) {
      handleSelectOption(options[highlightedIndex], highlightedIndex)
    }
  }, [setIsOpen, highlightOption, highlightedIndex, options])

  useEffect(()=>{
    setOverlayTop((labelRef.current?.offsetHeight||0) + 10)
  },[labelRef.current?.offsetHeight])

  useEffect(()=>{
    setOptionRefs(options.map(() => createRef<HTMLLIElement>()))
  }, [options.length])

  useEffect(() => {
    if(highlightedIndex === null || !isOpen) {
      return
    }
    const ref = optionRefs[highlightedIndex]
    ref?.current?.focus()
  }, [isOpen, highlightedIndex])

  return (
    <div className={classes['dse-select']}>
      <button data-testid="DseSelectButton" onKeyDown={handleKeyDown} aria-controls="dse-select-list" aria-haspopup={true} aria-expanded={isOpen? true: undefined} ref={labelRef} onClick={handleLabelClick} className={classes['dse-select__label']}>
        {!selectedOption? label: selectedOption.label}
        <svg className={caretClasses} width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && 
        <ul role="menu" id="dse-select-list" style={{top: overlayTop}} className={classes['dse-select__overlay']}>
          {options.map((option,optionIndex)=> {
            const isSelected = selectedIndex === optionIndex
            const isHighlighted = highlightedIndex === optionIndex
            const itemClasses = classnames({
              [classes['dse-select__option']]:true,
              [classes['dse-select__option--selected']]: isSelected,
              [classes['dse-select__option--highlighted']]: isHighlighted,
            })
            const ref = optionRefs[optionIndex]

            const renderOptProps: RenderProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => { 
                return {
                  ref,
                  role: 'menuitemradio',
                  key: option.value,
                  tabIndex: isHighlighted ? -1: 0,
                  className: itemClasses,
                  'aria-label': option.label,
                  'aria-checked': isSelected ? true: undefined,
                  onMouseEnter: () => highlightOption(optionIndex),
                  onMouseLeave: () => highlightOption(null),
                  onKeyDown: handleOptionKeyDown,
                  onClick: () => handleSelectOption(option, optionIndex),
                  ...overrideProps
                } 
              }
            }

            if(renderProps) {
              return renderProps(renderOptProps)
            }
            
            return (
              <li {...renderOptProps.getOptionRecommendedProps()}>
                {option.label}
                {isSelected && <svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>}
              </li>)
          })}
        </ul>}
    </div>)
}

const getPrevOptionIndex = (currentIndex: number|null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0
  }

  if (currentIndex === 0) {
    return options.length - 1
  }

  return currentIndex - 1
}

const getNextOptionIndex = (currentIndex: number|null, options: Array<SelectOption>) => {
  if (currentIndex === null || currentIndex === options.length - 1) {
    return 0
  }

  return currentIndex + 1
}

export default Select