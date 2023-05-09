FROM debian:latest

# Add the script to the Docker Image
ADD backup.sh /root/backup.sh

# Give execution rights on the cron scripts
RUN chmod 0644 /root/backup.sh

#Install Cron
RUN apt-get update
RUN apt-get -y install cron

# Add the cron job
RUN crontab -l | { cat; echo "*/5 * * * * bash /root/backup.sh"; } | crontab -

# Run the command on container startup
CMD cron