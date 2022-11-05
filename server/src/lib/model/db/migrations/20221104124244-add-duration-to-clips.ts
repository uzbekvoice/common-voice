export const up = async function (db: any): Promise<any> {
  return db.runSql(`
    alter table voice.clips
      add duration float null;
  `);
};

export const down = function (): Promise<any> {
  return null;
};
