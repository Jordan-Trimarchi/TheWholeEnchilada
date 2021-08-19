FROM postgres:latest

RUN mkdir /seed/
COPY data/*.csv /seed/

RUN chmod a+rx /seed

COPY backend/database/overviewSchema.sql /docker-entrypoint-initdb.d
