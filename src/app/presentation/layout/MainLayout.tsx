import { LayoutProps } from "@/app/type/Layout";
import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import LanguageButton from "../components/LanguageButton";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const MainLayout: React.FC<LayoutProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Layout className="main-layout">
      <Header>
        <h1>{props.title}</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <LanguageButton></LanguageButton>
          {props.title !== "" && (
            <Link href={"/"}>
              <Button style={{ padding: 5, width: "100%" }}>
                {t("home.home")}
              </Button>
            </Link>
          )}
        </div>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default MainLayout;
