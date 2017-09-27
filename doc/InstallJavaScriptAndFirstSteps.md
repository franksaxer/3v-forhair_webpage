# NodeJS
The framwork _Koa_ v2x requires a _NodeJS_ version higher than 7,6
 
## Install NVM (Node-Version-Manager)
Use the install script from the [git repository](https://github.com/creationix/nvm#git-install) with the newest version.
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/VERSION\_NUMBER/install.sh | bash
 
Restart the console after, so _nvm_ could be loaded.
 
 
# Install NodeJS Version
Install a _NodeJS_ version that is supported by _Koa_. (>v0.11)
Type:
 
nvm install v7.6.0
 
nvm alias default v7.6.0
 
nvm use default
 
It will install the necessary version of Nodejs which is v7.6.0 and will set it as default for future use.
 
## Install lts (long-term-supported) Version
To install the most recent version with long-term-support type in the following command. Check if the version fits.
$ nvm install --lts
 
## Install Specific Version
To install a specific version, type in the version number instead of the lts key.
 
## Use New Version
When start to use different versions of _NodeJS_ the following commands could help.
 
### Define Alias
Replace the keys in the following command by ur specific values. 
E.g. the alias could be 'default' that refers to 'v6.10.3'
$ nvm alias ALIAS\_NAME VERSION\_NUMBER
 
### Set Usage
Define which version should be used by _NodeJS_.
E.g. build on the example before, it the version number could be the alias 'default'.
$ nvm user VERSION\_NUMBER
 
### Check Usage
To check out, which version is currently in usage, which one is default and more, type in:
$ nvm ls
 
 
# Start A Project
 
## Initialize
Go into the directory where u like to put in the project and type:
$ npm init
 
The following questions can be skipped, if they are not necessary. All of them are changeable later.
It will create the 'package.json' file, where the description takes place and much more interesting, where the dependencies are defined.
 
## Install Modules
_NPM_ modules for _NodeJS_ can be installed by the following command:
$ npm install MODULE\_NAME --save
 
Adding the parameter 'save' will add the package automatically to the dependencies of your project.
The installed modules can be find in the directory *node_modules*.
 
## Clear Dependencies
Make sure all dependencies are installed, before start your server.
(If you do not set this up or a teammate have add a new one.)
$ npm install
 
It will automatically search for the 'package.json' file, read out the dependencies and check if anyone is missing on our local machine. If so, it will install them by itself.
 
