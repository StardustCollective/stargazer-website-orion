import React from "react";

import styles from "./index.module.scss";
import data from "src/assets/data/meta.json";
import { Card } from "src/components/common";

export const Cards: React.FC = () => {
  return (
    <div className={styles.cards}>
      {(data?.plugins ?? []).map((plugin) => (
        <div key={`key-${plugin.name}`} className={styles.cardWrapper}>
          <Card title={plugin.name}>{plugin.description}</Card>
        </div>
      ))}
    </div>
  );
};
