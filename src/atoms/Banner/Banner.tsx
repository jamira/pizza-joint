import { FC } from "react";
import styles from "./Banner.module.scss";

interface BannerProps {
  title: string;
  children?: any;
}

const Banner: FC<BannerProps> = ({ title, children }) => {
  return (
    <div className={styles.order_confirmed}>
      <div className={styles.order_confirmed__content}>
        <h1 className={styles.order_confirmed__title}>{title}</h1>
        <div className={styles.order_confirmed__lead} data-testid="banner-children">{children}</div>
      </div>
    </div>
  );
};

export default Banner;
