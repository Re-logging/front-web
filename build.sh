#!/bin/sh

# 현재 디렉토리에 output 폴더 생성
rm -rf output
mkdir -p output

# 필요한 파일들만 output 디렉토리로 복사
cp -R \
    README.md \
    package*.json \
    next.config.* \
    tsconfig.json \
    public \
    src \
    .env* \
    *.config.* \
    components.json \
    svgr.d.ts \
    vercel.json \
    output/

# auth 관련 파일들이 복사되었는지 확인
if [ ! -d "output/src/app/api/auth" ]; then
    echo "Warning: Auth directory is missing!"
fi