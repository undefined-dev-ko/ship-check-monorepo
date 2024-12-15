#!/bin/bash

# 환경변수 설정
source /home/ec2-user/.env

# AWS ECR 로그인
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${ECR_REGISTRY}.dkr.ecr.ap-northeast-2.amazonaws.com

# ECR에서 이미지 다운로드 및 실행
docker pull ${ECR_REGISTRY}.dkr.ecr.ap-northeast-2.amazonaws.com/${ECR_REPOSITORY}:latest
docker run -d -p 8080:8080 ${ECR_REGISTRY}.dkr.ecr.ap-northeast-2.amazonaws.com/${ECR_REPOSITORY}:latest