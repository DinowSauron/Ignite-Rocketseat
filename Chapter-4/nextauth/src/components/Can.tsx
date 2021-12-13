import { ReactNode } from "react"
import { useCan } from "../services/hooks/useCan"

type CanProps = {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

/**
 * Este componente é rederizado dependendo das permissões ou dos serviços que o usuário possuí.
 * 
 */
export function Can({permissions, roles, children}: CanProps) {
  const userCanSeeComponent = useCan({permissions, roles})

  if(!userCanSeeComponent) {
    return null
  }


  return (
    <>
      {children}
    </>
  )
}