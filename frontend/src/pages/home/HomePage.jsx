import { useAuthStore } from "../../store/authUser";
import AuthScreen from '../../pages/home/AuthScreen'
import HomeScreen from '../../pages/home/HomeScreen'

const HomePage = () => {

  const { user } = useAuthStore();
  return (
    <>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </>
  )
}
export default HomePage