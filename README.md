## Prerequisites

Make sure the following packages are all installed successfully before attempting to move forward.

Dependencies and prequisites in this repository are detailed for OSX development.

Both Dockerfile and Docker-Compose files can be used cross-platform.

Place your version of AEM in the /aem directory along with the license. If you intend on implementing automated builds with your github repository for your project, you'll need to move the CQ jar and license files to somewhere that Dockerhub can access it. This repository uses signed urls with AWS S3 + Cloudfront. Dockerhub does not support [LFS](https://git-lfs.github.com/).

This repository utilizes VirtualBox and the VirtualBox filesystem (vboxsf). If volume speed is an issue, it is suggested that repositories like [Dinghy](https://github.com/codekitchen/dinghy) are looked at for off the shelf NFS functionality.

##### Install VirtualBox and VirtualBox Extension Pack

```
https://www.virtualbox.org/wiki/Downloads
```

##### Install Homebrew (OSX)

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

##### Install Docker Toolbox (OSX)

```
brew install caskroom/cask/brew-cask
brew cask install dockertoolbox
```

## Docker Instructions

These instructions are aimed to ease the process in mounting the site repository to the docker container at run-time.

##### Create a Docker-Machine host installation

This step only needs to be ran once. This step controls how much memory is allocated to the docker-machine. The memory allocation can be modified in the file below.

```
./scripts/virtualbox.sh
```

## Site Codebase

Checkout any CVS branch/tag into the site directory within this repository. You will need to navigate to any SVN directory within the Docker container in order to build with Maven. It is advised if using Git to use Submodules.

##### Start and mount the volume to Virtualbox

Run this step every time your docker-machine is stopped or restarted. Boot2Docker ssh password is _**tcuser**_.

```
./scripts/volume.sh
```

##### If your docker-machine is stopped (reboot, machine shut down)

```
docker-machine start $(basename `pwd`)
```

##### Expose Docker to the current shell session

```
eval $(docker-machine env $(basename `pwd`))
```

##### Pull latest stable Docker image

Run this step to pull a fresh image from the Dockerhub repository.

```
docker pull deutsch/vw-aem:latest
```

##### Start your AEM container

```
docker-compose -f distribution/osx/latest.yaml up
```

##### View AEM in the browser

Retrieve the IP address for AEM. View AEM in the browser with the IP given via the command below and your correct AEM port (e.g. 4502)

```
docker-machine ip $(basename `pwd`)
```

## Maven build instructions

```
docker exec -it <organization>/vw-aem bash
cd /var/www/site/<CVS Branch>
mvn clean install -Pauto-deploy-all
```

### Docker local development

##### Build a local image

Time can be saved by building your local environment with the scripts located within the scripts directory in this repository. These scripts assure that the code repository is mounted and available within the docker container through vboxsf.

The volume is mounted with _**uid=1000**_ which allows both read and write access from within the docker container through the host virtualbox installation created with docker-machine.

Make sure that both the CQ jar and license reside in the aem directory before running.

```
docker build -t <local tag name> .
```

##### Start your local image

```
docker run -v /docker-aem:/var/www/site --name author -p 4502:4502 <local tag name>
```

##### Use Docker Compose to start your local instance

```
docker-compose -f distribution/osx/local.yaml up
```

##### Start a shell instance against previously started image

```
docker exec -it <local tag name> bash
```

### Grunt

The grunt task is designed to insert signed urls into the Dockerfile for both the CQ jar and license files in the event of linking automated builds with Dockerhub to your Github repo.

```
brew install nvm
```

```
nvm use
grunt upload
grunt signuri
```