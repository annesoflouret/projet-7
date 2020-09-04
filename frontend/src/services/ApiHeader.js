export default function apiHeader(authenticated = true) {
  let apiHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (authenticated) {
    apiHeaders['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  }

  return { headers: apiHeaders };
}