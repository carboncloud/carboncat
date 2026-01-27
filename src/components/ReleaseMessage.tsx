import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Releases } from 'releases/releasemsgs';

export interface ReleaseMessageProps {}

export const ReleaseMessage: React.FC<ReleaseMessageProps> = () => {
  const theme = useTheme2();
  const [newReleases, setNewReleases] = useState<string[]>([]);
  const [lastRead, setLastRead] = useState<string>('');

  useEffect(() => {
    const lastSeen = localStorage.getItem('carboncat.lastSeenVersion');
    if (lastSeen != null) {
      setLastRead(lastSeen);
    } else {
      setLastRead('');
    }
  }, []);

  useEffect(() => {
    const sortedKeys = Object.keys(Releases).sort(compareVersions);
    const filtered = sortedKeys.filter((v) => compareVersions(v, lastRead) < 0);
    setNewReleases(filtered);
  }, [lastRead]);

  const handleClose = () => {
    const lastVer = newReleases[0];
    localStorage.setItem('carboncat.lastSeenVersion', lastVer);
    setLastRead(lastVer);
  };

  return (
    <>
      {newReleases.length > 0 ? (
        <div
          className={clsx(
            'flex absolute inset-0 z-10 justify-center items-center rounded-lg backdrop-blur-[3px]',
            theme.isDark ? 'bg-black/20' : 'bg-white/20'
          )}
        >
          <div
            className={clsx(
              'relative flex flex-col p-4 w-1/3 min-h-1/3 max-h-2/3 overflow-hidden rounded-lg shadow-2xl border-1',
              theme.isDark ? 'bg-neutral-800 border-neutral-600' : 'bg-white border-neutral-300'
            )}
          >
            <span className='w-full text-lg font-semibold text-neutral-500'>
              Log Browser Updated!
            </span>
            <button
              className='bg-fuchsia-800 !text-white !font-semibold !rounded-md absolute top-2 right-2'
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
            <div className='flex flex-col overflow-y-scroll max-h-full mt-12'>
              <div className='flex flex-col gap-2 px-4 pt-4'>
                {newReleases.map((version) => (
                  <div key={version}>
                    <h3 className='!font-bold'>v{version}</h3>
                    <p>{Releases[version].notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

function compareVersions(a: String, b: String) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);

  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na < nb) {
      return 1;
    }
    if (na > nb) {
      return -1;
    }
  }
  return 0;
}
