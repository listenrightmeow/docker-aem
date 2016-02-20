FROM ubuntu:14.04
MAINTAINER listenrightmeow

RUN rm -rf /var/lib/apt/lists/*
RUN mkdir -p /var/www /var/www/vw /var/www/vw/aem /var/www/vw/site

RUN apt-get update
RUN apt-get install -y maven openjdk-7-jdk wget
RUN apt-get clean

RUN useradd -d /vw -m -s /bin/bash -U vw
RUN addgroup www-vw
RUN adduser vw www-vw
RUN adduser vw sudo

RUN mkdir -p /vw/.m2

ADD ./.m2/ /vw/.m2

# If you are running automated builds with Github to Dockerhub, you'll need to put both the license file and CQ somewhere that Dockerhub can get to it
# RUN cd /var/www/vw/aem && wget -O cq56-author-4502.jar "http://xxxxxx.cloudfront.net/cq56-author-4502.jar?Expires=1456008105..."
# RUN cd /var/www/vw/aem && wget -O license.properties "http://xxxxxx.cloudfront.net/license.properties?Expires=1456008105...."

RUN cd /var/www/vw/aem && aem/cq56-author-4502.jar
RUN cd /var/www/vw/aem && aem/license.properties

RUN ["java", "-XX:MaxPermSize=2048m", "-Xmx2048M", "-jar", "/var/www/vw/aem/cq56-author-4502.jar", "-unpack", "-r", "nosamplecontent"]

RUN chown -R vw:www-vw /var/www/vw
RUN chown -R vw:www-vw /vw/.m2

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64/jre/
ENV MAVEN_OPTS "-Xms1024M -Xmx2048M"

USER vw

WORKDIR /var/www/vw

CMD ["/usr/lib/jvm/java-7-openjdk-amd64/jre/bin/java", "-Xmx2048M", "-XX:MaxPermSize=2048M", "-jar", "/var/www/vw/aem/cq56-author-4502.jar", "-nofork", "-pt", "CHILD", "-use-control-port", "-p", "4502", "-gui", "-verbose"]

EXPOSE 4502 4503