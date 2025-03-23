import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


function Dashboard() {
  const user = useSelector((state: RootState) => state.app.user);
  console.log('user: ', user)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard