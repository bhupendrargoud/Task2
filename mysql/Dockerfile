# Use the official MySQL 8.0 image as the base image
FROM mysql

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=Ps1234
ENV MYSQL_DATABASE=nodedb

EXPOSE 3306

# Copy SQL scripts to initialize the database
COPY ./init.sql /docker-entrypoint-initdb.d/


