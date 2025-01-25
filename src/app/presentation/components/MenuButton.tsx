import { Card } from "antd";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

type MenuButtonProps = {
  title: string;
  index: number;
  path: string;
};

const MenuButton: React.FC<MenuButtonProps> = ({ title, index, path }) => {
  const { t } = useTranslation();
  return (
    <Link href={path}>
      <Card className="card-menu">
        <div>
          {t("home.test")} {index}
        </div>
        <div className="title">{title}</div>
      </Card>
    </Link>
  );
};

export default MenuButton;
