# lab-weapp-server

## ENV

- CentOS 7.3
- NodeJS v8.7.0
- Mongo v2.6.12
- domain `97374127.shawnyan.xyz`

## Dependency

- base
```bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
yum install -y gcc-c++ make nodejs nginx mongodb-server mongodb git
node -v
mongod --version
mongo --version
nginx -v
mkdir -pv /data/release
cd /data/release
git clone https://github.com/shawn0915/lab-weapp-server.git
```

- npm
```bash
cd /data/release/lab-weapp-server
#npm install pm2 --global
npm install pm2 -g --registry=https://r.cnpmjs.org/
npm install express --save
npm install connect-mongo wafer-node-session --save
npm install ws --save
npm install co --save

# pm2
pm2 start app.js
pm2 logs
pm2 restart app
```

- nginx

ssl.conf

在http的server里增加`rewrite ^(.*) https://$host$1 permanent;`


- mongo
```bash
mkdir -pv /data/mongodb
mkdir -pv /data/logs/mongodb

mongod --fork --dbpath /data/mongodb --logpath /data/logs/mongodb/weapp.log

netstat -ltp | grep 27017

mongo
> use weapp;
switched to db weapp
> db.createUser({ user: 'weapp', pwd: 'weapp-dev', roles: ['dbAdmin', 'readWrite']});
Successfully added user: { "user" : "weapp", "roles" : [ "dbAdmin", "readWrite" ] }
exit
```

- firewall

```bash
firewall-cmd --add-service=https
firewall-cmd --add-service=https --permanent
firewall-cmd --add-service=http
firewall-cmd --add-service=http --permanent
firewall-cmd --add-port=8765/tcp
```


## URL

```
http://97374127.shawnyan.xyz:8765
https://97374127.shawnyan.xyz/
```
