import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"

interface ActiveLinkProps extends LinkProps {
  children: ReactNode; // na aula foi utilizado o ReactElement
  activeClassName: string;
}

export function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps) {

  const { asPath } = useRouter();
  
  const className = asPath === rest.href ? activeClassName : ""

  // na aula foi utilizado o clone Element.
  /* 
  CloneElement(children, {
    className
  })
  */

  return (
    <Link {...rest} >
      <a className={className}>{children}</a>
    </Link>
  )
}