## install dependencies
```
yarn OR npm install
```

## start dev mode
```
yarn dev 

OR  

npm run dev
```

## Create a new model 
```
npx sequelize-cli model:generate --name Person --attributes firstName:string,lastName:string,email:string
```


## generate new seed file 
```
npx sequelize-cli seed:generate --name demo-person
```

## Run only one seed 
```
 npx sequelize-cli db:seed --seed src/seeders/20220711151020-demo-category.js 
 ```
## Run seederss
```
npx sequelize-cli db:seed:all
```