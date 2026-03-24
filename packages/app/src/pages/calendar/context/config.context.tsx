import type { CalendarConfig } from "@cal/types/config";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

export type Config = CalendarConfig & {
  overlapThresholdString: string;
  setCurrentSiteId: (siteId: number) => void;
};

export const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider: FC<PropsWithChildren<{ config: CalendarConfig }>> = ({
  config,
  children,
}) => {
  const [currentSiteId, setCurrentSiteId] = useState(config.currentSiteId);

  const expandedConfig = useMemo(
    () => ({
      ...config,
      overlapThresholdString: `0${config.overlapThreshold || 0}:00:00`,
      currentSiteId,
      setCurrentSiteId,
    }),
    [config, currentSiteId],
  );

  return <ConfigContext.Provider value={expandedConfig}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const config = useContext(ConfigContext) as Config;
  if (!config) {
    throw new Error("ConfigContext is not provided");
  }

  return config;
};
