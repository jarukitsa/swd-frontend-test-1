import { Select } from "antd";
import { useTranslation } from "react-i18next";

const LanguageButton = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language}
      value={i18n.language}
      onChange={changeLanguage}
      options={[
        { value: "en", label: "EN" },
        { value: "th", label: "ไทย" },
      ]}
    />
  );
};

export default LanguageButton;
