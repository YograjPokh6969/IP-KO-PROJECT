// Define React.ReactNode
declare namespace React {
  type ReactNode = 
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactElement
    | React.ReactPortal
    | Iterable<React.ReactNode>;
  
  interface FormEvent<T = Element> extends SyntheticEvent<T> {}
  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {}
  interface SyntheticEvent<T = Element> {
    target: EventTarget & T;
    preventDefault(): void;
  }
  
  interface EventTarget {
    value?: string;
  }
}

// Enable JSX
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {}
} 