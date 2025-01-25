import { useTranslation } from "react-i18next";
import MenuButton from "../components/MenuButton";

const HomeView = () => {
  const { t } = useTranslation();
  return (
    <div className="home-screen-layout">
      <div className="menu-container">
        <MenuButton
          title={t("layoutAndStyle.title")}
          index={1}
          path="/layout"
        ></MenuButton>
        <MenuButton
          title={t("connectAPI.title")}
          index={2}
          path="/"
        ></MenuButton>
        <MenuButton
          title={t("formAndTable.title")}
          index={3}
          path="/form"
        ></MenuButton>
      </div>
    </div>
  );
};

export default HomeView;
