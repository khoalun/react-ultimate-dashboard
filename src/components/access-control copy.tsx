import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface AccessControlProps extends React.PropsWithChildren {
  resource: string
}


/*
binary: https://www.freesoft.org/CIE/Topics/19.htm
bitwise (&): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND
(0 false, 1 true)
0001 - FFFT
0010 - FFTF

ex: access_level 7 (READ | CREATE | UPDATE) -> 00 00 01 11

CAN_READ
00 00 00 01
    &
00 00 01 11
-----------
00 00 00 01 -> CAN_READ

CAN CREATE
00 00 00 10
    &
00 00 01 11
-----------
00 00 00 10 -> CAN_CREATE

CAN UPDATE
00 00 01 00
    &
00 00 01 11
-----------
00 00 01 00 -> CAN_UPDATE
*/
const CAN_READ = 1; // 00 00 00 01
const CAN_CREATE = 2; // 00 00 00 10
const CAN_UPDATE = 4; // 00 00 01 00
const CAN_DELETE = 8; // 00 00 10 00

export const ROLE_USER: any = {
  admin: CAN_CREATE | CAN_UPDATE | CAN_DELETE | CAN_READ,
  member: CAN_READ,
  operator: CAN_CREATE | CAN_UPDATE | CAN_READ,
}

const permissions = {
  "/profile/action/edit": CAN_UPDATE,
  "/profile/action/delete": CAN_DELETE
}

function AccessControl({ children, resource }: AccessControlProps) {
  const role = useSelector((state: RootState) => state.app.user)?.role;

  if (!role) return null;

  if (!((permissions as any)[resource] & ROLE_USER[role])) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}

export default AccessControl