In Node.js, the simplest pattern to distribute the load of an application across 
different instances running on a single machine is by using the cluster module, 
which is part of the core libraries. The cluster module simplifies the forking of new 
instances of the same application and automatically distributes incoming connections 
across them, as shown in the following figure:


![alt text](https://github.com/amangautam2/LearningGoals/cluster/cluster.png)


The master process is responsible for spawning a number of processes (workers), 
each representing an instance of the application we want to scale. Each incoming 
connection is then distributed across the cloned workers, spreading the load 
across them 
