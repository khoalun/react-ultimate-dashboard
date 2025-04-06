import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface AccessControlProps extends React.PropsWithChildren {
  resource: string
}

export const roleUser: any = {
  admin: ['CAN_CREATE', 'CAN_UPDATE', 'CAN_DELETE', 'CAN_READ'],
  member: ['CAN_READ'],
  operator: ['CAN_CREATE', 'CAN_UPDATE', 'CAN_READ'],
}

const permissions: any = {
  "/profile/action/edit": 'CAN_UPDATE',
  "/profile/action/delete": 'CAN_DELETE'
}

function AccessControl({ children, resource }: AccessControlProps) {
  const role = useSelector((state: RootState) => state.app.user)?.role || '';
  const ROLES = roleUser?.[role] || [];

  if (!role) return null;

  if (!ROLES.includes(permissions[resource])) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}

export default AccessControl