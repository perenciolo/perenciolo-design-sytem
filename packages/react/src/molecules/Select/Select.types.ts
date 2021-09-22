export enum KEY_CODES  {
  ENTER = "Enter",
  SPACE = "Space",
  DOWN_ARROW = "ArrowDown",
  UP_ARROW = "ArrowUp",
  ESC =  "Escape"
}

export interface SelectOption {
  label:string
  value:string
}

export interface ItemProps {
  key: string
  className: string
  onClick: () => void
  [key: string]: unknown
}

export interface RenderProps {
  isSelected: boolean
  option: SelectOption 
  getOptionRecommendedProps: (overrideProps?: Partial<ItemProps>) => {}
}

export interface SelectProps {
  children?: React.ReactNode
  onSelectOption?: (option: SelectOption, optionIndex:number) => void;
  label?:string
  options?: SelectOption[]
  renderProps?: (props: RenderProps) => React.ReactNode
}