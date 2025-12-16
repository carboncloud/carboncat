import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Notification = {
  icon: IconProp;
  message: string;
};

export type LogDetailsSelection = {
  timestamp: string;
  app: string;
  service: string;
  body: string;
};
