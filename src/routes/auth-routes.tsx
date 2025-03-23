import React from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import { PATH } from '../configs';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/appSlice';

function AuthRoutes({ children }: React.PropsWithChildren) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const access_token = window.localStorage.getItem('access_token');

  React.useEffect(() => {
    if (!access_token) return;

    async function checkAuthenticated() {
      try {
        // const res: any = await axios('https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/auth', {
        //   method: 'POST',
        //   headers: {
        //     'x-auth-token': access_token
        //   }
        // })
        // const user = res.user.user;
        const user = {
            "id": "67b605dfb3917ce0353db8f0",
            "avatar": "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/009d272e2b496aa0758a86a17eac5f7716a99133_full.jpg",
            "email": "tony@gmail.com",
            "role": "operator"
        };
        dispatch(setUser(user))
        setIsAuthenticated(true);
      } catch (err) {
        window.localStorage.clear();
        navigate(PATH.UNAUTHORIED_PAGE)
      }
    }
    checkAuthenticated();
  }, [access_token])

  if(!access_token) {
    return <Navigate to={PATH.LOGIN} />
  }

  if(!isAuthenticated) return null;

  return (
    <>{children}</>
  )
}

export default AuthRoutes