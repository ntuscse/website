// This file is to init local mongodb. Check docker-compose-local.yaml file for more details
/* eslint-disable */
db.createCollection("seasons");
db.createCollection("rankings");
db.createCollection("questions");
db.createCollection("submissions");
db.createCollection("users");
db.createCollection("tokens");