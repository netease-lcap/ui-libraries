import React from 'react';

export interface BasePlugin {
  $deleteList: string[];
  mapProps: Record<string, string>;

  usePlugin: Record<string, any> | (() => Record<string, any>);
  render: React.FC;
}
