# rest-node-auth
demo app to do restful authentication

"jsonwebtoken": "^5.5.4",

## database setup
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
apt-get -y update
apt-get -y install mongodb-10gen

cd docs
mongo
>load("schema.js");

## design document reference
 
 
## run test 
1) install grunt as root
npm install -g grunt-cli
2) run test

 
## npm command
npm list -g --depth=0
-S, --save: Package will appear in your dependencies.
-D, --save-dev: Package will appear in your devDependencies

## install node pkg
npm i body-parser express mongoose morgan errorhandler -S
npm i passport passport-local connect-mongodb-session serve-favicon method-override express-session multer --save

## install test pkg
npm i grunt grunt-contrib-uglify grunt-contrib-nodeunit -D