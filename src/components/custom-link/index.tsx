import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";


const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={`flex flex-row items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${match && 'bg-muted text-primary'}`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

export default CustomLink;