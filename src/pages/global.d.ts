// Global type declarations
declare module 'react' {
  export default React;
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type ReactNode = React.ReactNode;
}

declare module 'react-router-dom' {
  import React from 'react';
  
  export interface LinkProps {
    to: string;
    replace?: boolean;
    children?: React.ReactNode;
    className?: string;
  }
  export const Link: React.FC<LinkProps>;
  
  export interface NavLinkProps extends LinkProps {
    end?: boolean;
  }
  export const NavLink: React.FC<NavLinkProps>;
  
  export interface RouteProps {
    path: string;
    element: React.ReactNode;
  }
  export const Route: React.FC<RouteProps>;
  
  export interface RoutesProps {
    children: React.ReactNode;
  }
  export const Routes: React.FC<RoutesProps>;
  
  export interface NavigateProps {
    to: string;
    replace?: boolean;
  }
  export const Navigate: React.FC<NavigateProps>;
  
  export function useParams<T extends Record<string, string | undefined>>(): T;
  
  export const BrowserRouter: React.FC<{children: React.ReactNode}>;
}

declare module 'react-bootstrap' {
  import React from 'react';
  
  export const Container: React.FC<{
    children: React.ReactNode;
    className?: string;
    fluid?: boolean;
  }>;
  
  export const Row: React.FC<{
    children: React.ReactNode;
    className?: string;
  }>;
  
  export const Col: React.FC<{
    children: React.ReactNode;
    md?: number;
    lg?: number;
    className?: string;
  }>;
  
  export const Card: React.FC<{
    children: React.ReactNode;
    className?: string;
  }> & {
    Body: React.FC<{
      children: React.ReactNode;
      className?: string;
    }>;
    Header: React.FC<{
      children: React.ReactNode;
      className?: string;
    }>;
  };
  
  export const Form: React.FC<{
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
    className?: string;
  }> & {
    Group: React.FC<{
      children: React.ReactNode;
      className?: string;
    }>;
    Label: React.FC<{
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }>;
    Control: React.FC<{
      type?: string;
      placeholder?: string;
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
      required?: boolean;
      className?: string;
      as?: string;
      size?: string;
      style?: React.CSSProperties;
      children?: React.ReactNode;
    }>;
    Check: React.FC<{
      type?: string;
      id?: string;
      label?: string | React.ReactNode;
      checked?: boolean;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      required?: boolean;
    }>;
  };
  
  export const Button: React.FC<{
    children: React.ReactNode;
    variant?: string;
    type?: string;
    size?: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
  }>;
  
  export const Navbar: React.FC<{
    children: React.ReactNode;
    bg?: string;
    expand?: string;
    className?: string;
  }> & {
    Brand: React.FC<{
      children: React.ReactNode;
      as?: any;
      to?: string;
      className?: string;
    }>;
    Toggle: React.FC<{
      'aria-controls': string;
    }>;
    Collapse: React.FC<{
      id: string;
      children: React.ReactNode;
    }>;
  };
  
  export const Nav: React.FC<{
    children: React.ReactNode;
    className?: string;
  }> & {
    Link: React.FC<{
      children: React.ReactNode;
      as?: any;
      to?: string;
      end?: boolean;
      className?: string;
    }>;
  };
  
  export const Table: React.FC<{
    children: React.ReactNode;
    hover?: boolean;
    responsive?: boolean;
    className?: string;
  }>;
  
  export const Badge: React.FC<{
    children: React.ReactNode;
    bg: string;
    className?: string;
  }>;
  
  export const InputGroup: React.FC<{
    children: React.ReactNode;
  }> & {
    Text: React.FC<{
      children: React.ReactNode;
    }>;
  };
  
  export const Alert: React.FC<{
    children: React.ReactNode;
    variant: string;
    className?: string;
  }>;
  
  export const Tab: React.FC<{
    children: React.ReactNode;
    eventKey: string;
    title: React.ReactNode;
  }>;
  
  export const Tabs: React.FC<{
    children: React.ReactNode;
    activeKey: string;
    onSelect: (k: string | null) => void;
    className?: string;
  }>;
}

declare module 'react-icons/bs' {
  import React from 'react';
  
  export const BsCarFront: React.FC<{
    className?: string;
  }>;
  
  export const BsPersonCircle: React.FC<{
    className?: string;
  }>;
  
  export const BsExclamationTriangle: React.FC<{
    className?: string;
  }>;
  
  export const BsExclamationTriangleFill: React.FC<{
    className?: string;
  }>;
  
  export const BsCheckCircle: React.FC<{
    className?: string;
  }>;
  
  export const BsCheckCircleFill: React.FC<{
    className?: string;
  }>;
  
  export const BsXCircle: React.FC<{
    className?: string;
  }>;
  
  export const BsCarFrontFill: React.FC<{
    className?: string;
  }>;
  
  export const BsCalendarEvent: React.FC<{
    className?: string;
  }>;
  
  export const BsCurrencyDollar: React.FC<{
    className?: string;
  }>;
  
  export const BsSearch: React.FC<{
    className?: string;
  }>;
  
  export const BsPersonFill: React.FC<{
    className?: string;
  }>;
  
  export const BsShieldLockFill: React.FC<{
    className?: string;
  }>;
  
  export const BsGrid: React.FC<{
    className?: string;
  }>;
  
  export const BsListUl: React.FC<{
    className?: string;
  }>;
  
  export const BsFunnel: React.FC<{
    className?: string;
  }>;
  
  export const BsDownload: React.FC<{
    className?: string;
  }>;

  export const BsBell: React.FC<{
    className?: string;
  }>;

  export const BsGear: React.FC<{
    className?: string;
  }>;

  export const BsBoxArrowRight: React.FC<{
    className?: string;
  }>;

  export const BsShieldCheck: React.FC<{
    className?: string;
  }>;

  export const BsSortDown: React.FC<{
    className?: string;
  }>;

  export const BsPlusCircle: React.FC<{
    className?: string;
  }>;

  export const BsArrowUp: React.FC<{
    className?: string;
  }>;

  export const BsArrowDown: React.FC<{
    className?: string;
  }>;

  export const BsSortAlpha: React.FC<{
    className?: string;
  }>;

  export const BsSort: React.FC<{
    className?: string;
  }>;

  export const BsArrow: React.FC<{
    className?: string;
  }>;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Image declarations
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
} 