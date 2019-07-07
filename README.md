# StatisticsAssignment
Consists of 3 parts - 1. React client 2.Node express server 3.Thrift Java server

N.B. - systemA and systemB should be run simultaneously

From root directory<br>
Steps for running systemA<br>
1. docker build -t systema systemA<br>
2. docker run -t -p 3000:3000 systema

Steps for running systemB<br>
1. docker build -t systemb systemB<br>
2. docker run -t -p 9090:9090 systemb<br>

<b>Without docker, application can be run by following the steps given below in order -</b>
1. For systemA (Prerequisite - node should be installed)<br>
  a. cd systemA/client -> npm install -> npm run build<br>
  b. cd systemA/server -> npm install -> npm start<br>
2. For systemB (Prerequisites - Maven and java should be installed in the system)<br>
  a. cd systemB -> mvn clean install<br>
  b. mvn spring-boot:run

Versions used - <br>
React - 16.5.2<br>
Express - 4.16.0<br>
Thrift - 0.12.0<br>
