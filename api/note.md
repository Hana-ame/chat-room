# 一时兴起的chat-room

## TODO 

参考 gitter.im ？

table:users
username password email

table:peer_chats
id receiver poster payload

table:group_chats
id group poster payload

web:
lists in left 
posts in right.

## SQLite

select names of tables.

```sql
SELECT name FROM sqlite_master;
SELECT name FROM sqlite_master WHERE type='table';
```

select * from [table].

```sql
select * from group_chats;
```

for gorm.Module, (1)ID is self increasement, (2)time is now_time, (3)deleteAt is empty.

# route and SPA
the route priority of iris is somewhat hard to handle the api and static files at the same time. move this part to nginx.

(maybe recompile failed.)

# nginx
```sh
./nginx.exe -s reload
```