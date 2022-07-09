cd layer

zip -9vr nodejs.zip nodejs -x nodejs/node_modules/@types/** -x nodejs/node_modules/**/query-engine-** -x nodejs/node_modules/@prisma/engines/**

cd ..
