import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { PATH } from '../configs';

interface RoleRoutesProps extends React.PropsWithChildren {
  requireRoles?: string[]
}

function RoleRoutes({ children, requireRoles = [] }: RoleRoutesProps) {
  const user = useSelector((state: RootState) => state.app.user)
  const role = user?.role;

  React.useEffect(() => {
    if (!role || requireRoles.length === 0) return;

    const checkRole = requireRoles.includes(role);
    if (!checkRole) {
      window.location.href = PATH.RESTRICT_ACCESS_PAGE
    }
  }, [role, requireRoles])

  return (
    <>{children}</>
  )
}

export default RoleRoutes