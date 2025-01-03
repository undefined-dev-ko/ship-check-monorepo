#!/bin/bash

# 환경변수 설정
source /home/ec2-user/app/.env

# AWS ECR 로그인
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${ECR_REGISTRY}.dkr.ecr.ap-northeast-2.amazonaws.com

# ECR에서 이미지 다운로드 및 실행
docker pull ${ECR_REGISTRY}.dkr.ecr.ap-northeast-2.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}
docker run -d -p 8080:8080 \
  -e SECRET=${JWT_SECRET} \
  -e GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
  -e GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET} \
  -e GOOGLE_REDIRECT_URL=${GOOGLE_REDIRECT_URL} \
  ${ECR_REGISTRY}.dkr.ecr.ap-northeast-2.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}