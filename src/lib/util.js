export const getToken = () => {
  const token = sessionStorage.getItem('amwsToken')
  if (token) return token
  else return ''
}
