import React from 'react';
export type ReleaseInfo = {
  notes: React.ReactNode;
};

export const Releases: Record<string, ReleaseInfo> = {
  '0.0.10': {
    notes: (
      <>
        Adds ability to <b>stream</b> logs from the server instead of getting everything in one go. This speeds up the
        time from refresh until you see the first 500 lines.
        <br />
        <br />
        To enter <b>streaming mode</b> there is a new button in the top right corner, next to the refresh and auto
        refresh buttons.
        <br />
        By default you are still in the old batch mode. When you enter <b>streaming mode</b> another button will also
        appear. This is a stop button so you can cancel a running query.
        <br />
        <br />
        <b>NOTE:</b> The <b>streaming mode</b> is still in an early phase. Use it with some caution. If a log line that
        you expect is not appearing, check with batch mode as well.
        <br />
        <br />
        <b>THIS FEATURE ONLY WORKS WELL IF YOU ARE SORTING BY TIME. </b> If not log messages will pop up all over the
        place.
        <br />
        <br />
        🎄 Merry Chrysler 🎄
        <br />
        Scaffolders
      </>
    ),
  },
  '0.0.11': {
    notes: (
      <>
        Implements a smarter batch query to Clickhouse to minimise data transfer to frontend. Now we only fetch the data
        you as a user has selected to view, which reduces the data size massively and gives a much faster query!
        <br />
        <br />
        <b>Streaming mode</b> is still there, but <b>DONT USE IT</b>. The batch mode should out perform it by miles.
        <br />
        <br />
        🎄 Merry Chrysler 🎄
        <br />
        Scaffolders
      </>
    ),
  },
  '0.0.12': {
    notes: (
      <>
        Yet another version. This one includes mostly bugfixes.
        <br />
        <br />
        <b>Features</b>
        <br />
        - User can now set query limit in settings.
        <br />
        <br />
        <b>Bugfixes</b>
        <br />
        - Log details works even if app and component cols are not shown.
        <br />
        - Release messages now scroll instead of beeing bigger than the screen.
        <br />
        - User should not have to clear local storage on updates now.
        <br />
        <br />
        🎄 Merry Chrysler 🎄
        <br />
        Scaffolders
      </>
    ),
  },
};
