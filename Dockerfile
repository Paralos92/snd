FROM php:7.1.3-cli

RUN apt-get update && \
    apt-get install -y git zip unzip && \
    apt-get -y autoremove && \
    apt-get clean && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /opt/mockery

COPY composer.json ./
