"use client";
import MainLayout from "./presentation/layout/MainLayout";
import HomeView from "./presentation/views/HomeView";
import { appWithTranslation } from "next-i18next";
import "./utils/i18n";
const Home = () => {
  return (
    <MainLayout title={""}>
      <HomeView></HomeView>
    </MainLayout>
  );
};
export default appWithTranslation(Home);
