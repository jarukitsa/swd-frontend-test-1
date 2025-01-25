"use client";
import { appWithTranslation, useTranslation } from "next-i18next";
import "../utils/i18n";
import MainLayout from "../presentation/layout/MainLayout";
import FormView from "../presentation/views/FormView";
const Form = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t("formAndTable.title")}>
      <FormView></FormView>
    </MainLayout>
  );
};
export default appWithTranslation(Form);
