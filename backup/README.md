# Export & Restore Database Data

## 1. Create a Production Backup
SSH into the remote server:
```shell
cd ~/dir-containing-ssh-key

ssh -i ./ssh-key.key ubuntu@ip-address
```

Dump the savorydb database:
```shell
docker exec savory-mongodb mongodump \
  --db=savorydb \
  --archive \
  --gzip \
  > "$HOME/backup/savory-production-data-$(date +%F).archive.gz"
```

Verify the backup:
```shell
ls -lh ~/backup/
sha256sum ~/backup/savory-production-data-$(date +%F).archive.gz
```

## 2. Copy the Backup to the local filesystem
```shell
scp \
  -i ~/dir-containing-ssh-key/ssh-key.key \
  ubuntu@ip-address:~/backup/savory-production-data-$(date +%F).archive.gz \
  ~/Documents/Projects/Savory/backup/backups/
```

Verify the checksum against the value generated on the Prod server:
```shell
sha256sum ~/Documents/Projects/Savory/backup/savory-production-data-$(date +%F).archive.gz
```

## 3. Restore to Local MongoDB
```shell
docker exec -i savory-mongodb mongorestore \
  --archive \
  --gzip \
  --nsInclude='savorydb.*' \
  < ~/Documents/Projects/Savory/backup/savory-production-$(date +%F).archive.gz
```
