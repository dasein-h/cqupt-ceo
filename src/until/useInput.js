import {useState} from 'react'

export default (initialValue) => {
  const [val, setVal] = useState(initialValue)
  return [val, {
    onChange(e) {
      setVal(e.target.value)
    }
  }]
}
