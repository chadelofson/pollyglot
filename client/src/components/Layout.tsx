import type {ReactNode} from "react";
import Header from "./Header.tsx";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="main-layout">
      <Header />
      {children}
    </div>
  )
}