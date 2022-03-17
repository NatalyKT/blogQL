// Utility to convert image to base64 string

export const convertImg = (img) => {
  const reader = new FileReader()

  return new Promise((res) => {
    reader.onload = () => {
      res(reader.result)
    }
    reader.readAsDataURL(img)
  })
}
