// Custom hook for working with the form

import { useState } from 'react'

export const useForm = (cb, state = {}) => {
  const [formData, setFormData] = useState(state)

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    cb()
  }

  return {
    handleChange,
    handleSubmit,
    formData
  }
}
