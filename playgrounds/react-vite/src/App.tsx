import { Margin, Select } from "@perenciolo-design-system/react";

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

function App() {
  return (
    <Margin>
      <Select options={options} />
    </Margin>
  )
}

export default App
