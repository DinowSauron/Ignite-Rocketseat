import { useContext } from 'react';
import { validadeUserAccess } from '../../utils/ValidateUserAccess';
import { AuthContext } from "../contexts/AuthContext"

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
}

export function useCan({permissions, roles}: UseCanParams) {
  const { user, isAuthenticated} = useContext(AuthContext);

  
  if (!isAuthenticated) {
    return false;
  }

  const userHasValidAccess = validadeUserAccess({user,permissions,roles})

  return userHasValidAccess;
}