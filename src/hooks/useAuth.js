import { useSelector } from "react-redux"


export const useAuth = () => {
  const token = useSelector(state => state.user.token)
  

  return {
    token: token,
    isAuth: !!token,
  }
}