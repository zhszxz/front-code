```shell
npm run build

tar -czf dist.tar.gz -C dist .

scp dist.tar.gz ubuntu@106.54.2.137:/tmp/produce-ledger.tar.gz

ssh ubuntu@106.54.2.137 "sudo tar -xzf /tmp/produce-ledger.tar.gz -C /var/www/produce-ledger && sudo systemctl reload nginx"
```

