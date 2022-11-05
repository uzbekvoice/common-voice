export const up = async function (db: any): Promise<any> {
  return db.runSql(`
create or replace view voice_scores as
(
SELECT client_id,
       coalesce(user_account.full_name, username)                                                 as username,
       avatar_url,
       avatar_clip_url,
       (select coalesce(count(distinct clips.id), 0)
        from clips
        where clips.client_id = user_clients.client_id)                                           as clips_count,
       (select coalesce(count(distinct clips.id), 0)
        from clips
        where clips.client_id = user_clients.client_id
          and clips.is_valid = true)                                                              as valid_clips_count,
       (select coalesce(count(distinct clips.id), 0)
        from clips
        where clips.client_id = user_clients.client_id
          and clips.is_valid = false)                                                             as invalid_clips_count,
       coalesce(((select count(distinct clips.id)
                  from clips
                  where clips.client_id = user_clients.client_id
                    and clips.is_valid = true) -
                 (select count(distinct clips.id)
                  from clips
                  where clips.client_id = user_clients.client_id
                    and clips.is_valid = false)) / (select count(distinct clips.id)
                                                    from clips
                                                    where clips.client_id = user_clients.client_id
                                                      and clips.is_valid is not null) * 100, 100) as accuracy,
       TRUNCATE(coalesce(((select count(distinct clips.id)
                           from clips
                           where clips.client_id = user_clients.client_id
                             and clips.is_valid = true) -
                          (select count(distinct clips.id)
                           from clips
                           where clips.client_id = user_clients.client_id
                             and clips.is_valid = false)) / (select count(distinct clips.id)
                                                             from clips
                                                             where clips.client_id = user_clients.client_id
                                                               and clips.is_valid is not null) * 1, 1) *
                (select coalesce(count(distinct clips.id), 0)
                 from clips
                 where clips.client_id = user_clients.client_id), 2)                              as total
FROM user_clients
         LEFT JOIN user_account ON user_account.uuid = user_clients.client_id
WHERE user_account.is_banned is null
   or user_account.is_banned = false
GROUP BY client_id
HAVING clips_count > 0);
  `);
};

export const down = function (): Promise<any> {
  return null;
};
