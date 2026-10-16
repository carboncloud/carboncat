import React, { useEffect, useState } from 'react';
import { useTheme2 } from '@grafana/ui';
import { rangeUtil } from '@grafana/data';
import clsx from 'clsx';
import { useSharedState } from './StateContext';
import { getClusters } from 'utils/clickhouse';

export function ClusterButtons() {
  const theme = useTheme2();
  const { userState, userDispatch } = useSharedState();
  const [clusters, setClusters] = useState<string[]>([]);

  useEffect(() => {
    getClusters(
      userState.datasource,
      rangeUtil.convertRawToRange({ from: userState.timeFrom, to: userState.timeTo }),
      (fields) => {
        setClusters((fields[0]?.values as string[]) || []);
      }
    ).catch((err: any) => {
      console.log(err.message || 'Unknown error');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.datasource]);

  if (clusters.length === 0) {
    return null;
  }

  const activeCluster = userState.filters.find((f) => f.key === 'cluster' && f.operation === '=')?.value;

  const handleClick = (cluster: string) => {
    if (activeCluster === cluster) {
      userDispatch({ type: 'FILTER_RM', payload: { key: 'cluster', operation: '=', value: cluster } });
    } else {
      userDispatch({ type: 'FILTER_SET', payload: { key: 'cluster', operation: '=', value: cluster } });
    }
  };

  return (
    <div
      className={clsx(
        'inline-flex mx-4 rounded-lg border',
        theme.isDark ? 'border-neutral-200/20' : 'border-neutral-200'
      )}
    >
      {clusters.map((cluster, idx) => (
        <div
          key={cluster}
          title={cluster}
          onClick={() => handleClick(cluster)}
          role="button"
          className={clsx(
            'flex items-center justify-center px-3 py-2 text-sm transition-colors',
            theme.isDark ? 'hover:bg-neutral-500' : 'hover:bg-neutral-100',
            idx === 0 ? 'rounded-l-lg' : '',
            idx === clusters.length - 1 ? 'rounded-r-lg' : '',
            activeCluster === cluster
              ? theme.isDark
                ? 'bg-neutral-200/20'
                : 'bg-gray-200 text-gray-900'
              : theme.isDark
              ? 'bg-neutral-800/20'
              : 'bg-white text-gray-600'
          )}
        >
          {cluster}
        </div>
      ))}
    </div>
  );
}
