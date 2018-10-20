FROM node:8.11.1-slim

ARG APISECRET
ARG QAKEY
ARG ENVIRONMENT
ARG DURATION
ARG THINKTIME
ARG SONARTOKEN
ARG SONARORGANISATION

ENV SONARTOKEN=${SONARTOKEN}
ENV SONARORGANISATION=${SONARORGANISATION}
ENV duration=${DURATION}
ENV thinkTime=${THINKTIME}
ENV apiSecret=${APISECRET}
ENV qaKey=${QAKEY}
ENV env=${ENVIRONMENT}

WORKDIR /app
ADD . /app

RUN apt-get update

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.6.0 \
&& export PATH=$HOME/.yarn/bin:$PATH

COPY startup.sh /startup.sh

ENTRYPOINT ["/startup.sh"]

