"use client";
import { appWithTranslation, useTranslation } from "next-i18next";
import "../utils/i18n";
import LayoutView from "../presentation/views/LayoutView";
import MainLayout from "../presentation/layout/MainLayout";
const Home = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t("layoutAndStyle.title")}>
      <LayoutView></LayoutView>
    </MainLayout>
  );
};
export default appWithTranslation(Home);
