import { Footer } from "@/common/components/footer/footer.component";
import { NavBar } from "@/common/components/navbar/navbar.component";
import { FunctionComponent } from "react";

interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: FunctionComponent<IMainLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>{children}</main>

      <Footer />
    </>
  );
};
