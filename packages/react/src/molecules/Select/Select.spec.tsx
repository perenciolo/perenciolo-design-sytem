import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Select from './Select'
import { KEY_CODES } from './Select.types'

describe('Select', () => {
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
  
  it('renders all options passed to it', () => {
    const {getAllByRole, getByTestId} = render(<Select options={options} />)
    fireEvent.click(getByTestId("DseSelectButton"))
    expect(getAllByRole('menuitemradio')).toHaveLength(options.length)
  })

  it('should render options using custom renderOption method when it is passed as prop', () => {
    render(<Select options={options} renderProps={({
      getOptionRecommendedProps,
      option
    })=> (<div data-testid="some-id" {...getOptionRecommendedProps({
      className: 'some-className'
    })}>
        {option.label}
      </div>) } />)
    fireEvent.click(screen.getByTestId("DseSelectButton"))
    expect(screen.queryAllByTestId("some-id")).toHaveLength(3)
  })

  it('should call the onSelectOption prop with the selected option and its index when it is passed correctly', () => {
    const onSelectOption = jest.fn()
    render(<Select options={options} onSelectOption={onSelectOption}/>)
    const selectBtn = screen.getByTestId("DseSelectButton")
    const idx = 2
    const opt = options[idx]
    const label = opt.label

    fireEvent.click(selectBtn)
    fireEvent.click(screen.getByLabelText(label))
    
    expect(onSelectOption).toHaveBeenCalledTimes(1)
    expect(onSelectOption).toHaveBeenNthCalledWith(1, opt, idx)
  })

  it('should change the button label to the selected option label', ()=> {
    render(<Select options={options} />)
    const selectBtn = screen.getByTestId("DseSelectButton")
    const label = options[0].label

    expect(screen.queryByText(label)).not.toBeInTheDocument()

    fireEvent.focus(selectBtn)
    fireEvent.keyDown(selectBtn,{
      key: KEY_CODES.DOWN_ARROW, 
      code: KEY_CODES.DOWN_ARROW
    })

    fireEvent.keyDown(screen.getByLabelText(label),{
      key: KEY_CODES.ENTER, 
      code: KEY_CODES.ENTER
    })

    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it.todo('should snapshot the selected option state')

  it.todo('should snapshot the base state')

  it.todo('should snapshot the option menu open state')
})