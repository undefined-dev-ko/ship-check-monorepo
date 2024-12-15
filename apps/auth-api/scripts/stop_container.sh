#!/bin/bash

# 실행중인 컨테이너 중지 및 삭제
docker stop $(docker ps -a -q) || true
docker rm $(docker ps -a -q) || true