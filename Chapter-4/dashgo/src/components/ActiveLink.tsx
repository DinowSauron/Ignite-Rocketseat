
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shuldMatchExactHref?: boolean;
}


export function ActiveLink({
  children,
  shuldMatchExactHref=false,
  ...rest
}: ActiveLinkProps) {
  
  const { asPath } = useRouter();
  let isActive = false;
  // console.log(asPath)

  const matchHref = shuldMatchExactHref ? 
    asPath === rest.href :
    asPath.includes(rest.href.toString())

  if(matchHref || asPath === rest.as) {
    isActive = true;
  }


  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "blue.400" : "gray.50"
      })}
    </Link>
  );
}