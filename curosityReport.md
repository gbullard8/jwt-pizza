#Curosity Report - Serverless Deployment
Gregory Bullard

#Introduction
Serverless Deployment is a new way for people and companies to store data, host sites, compute funtions, and many other tasks. 
What is meant by serverless is that while there are servers involved, they are hosted and managed by a 3rd party. Where in the
past people people would need their own physical servers for deployment, now there are cloud services that can be used and 
manage the allocation of resources based on requirements at any given time.

#Concept
-Serverless Deployment is a distributed system design which means that what we would consider a normal application is broken up
 into a number of independent functions.
-They are built around event driven design which means that it relies on events such as HTTP requests or triggers to start functions.
-There can be a major overhead cost to having to purchase and provision servers appropriately
-Serverless Deployment moves this to a pay as you go service, getting rid of the major cost of setting up and managing servers
-The servers are able to scale to demand at any given time
-Built to be stateless, requiring storage such as databases to store the data, which these services often offer. For example, 
  Amazon Web Services(aws) offers access to their DynamoDB database service.


#Benefits and Uses
-Serverless Deployment can be a major benefit for smaller companies and startups as they don't need to have their own servers
 or staff to manage those servers which can save a lot of time any money. 
-Security management is also not an issue as that is managed by the provider with patches, security updates, and physical security.
-As noted above it is a pay as you go service, so you only pay for the time used. 
-It can be used by companies with their own servers as overflow, when their own servers hit capacity they can have them set up to 
 send the excess demand to a cloud service.
-It can be used as a redundency, meaning that if a companies servers fail for any reason, it can be set up to automatically kick over
 to a serverless deployment
-Serverless cloud companies often have servers all over the world. Instead of either setting these up all over, or subjecting your 
 distant users to slow service, they can provision servers worldwide as required by use. 

#Challenges
-Most sites have some limitations on the memory usage, execution time, and other elements that may impact speed, which make it so
 it may not be ideal for every usage case.
-It can add complexity to debugging code due to its stateless nature, event driven design, and that you are dealing with many different
 independent functions which can make it a lot more effort to trace values or objects through multiple logs.
-It can be difficult to change between the different services as they offer different services and their design implementations can be different.
-The provider can increase their prices, modify, add, eliminate services. You may need to adapt or switch, which can be difficult, tedious, 
 and/or expensive.
-The provider can have outages, security issues, or other problems that are out of your control that you have to deal with.

#Conclusion
There are many reason to use and not to use serverless deployment. It is heavily case and usage dependent. It can be a major boon to anybody
looking to build their own application and doesn't have the resources to purchase and manage their own servers. It can be incredibly useful
to companies looking to ensure they have near 100% uptime and can host any amount of users at any given time anywhere in the world. Serverless
deployments can be great in many different services and situations. When deciding if it is right for any given deployment it is important to 
consider both the upsides and the downsides of the service, and try and figure out what is best. It is incredibly useful and interesting 
technology that will likely get much better as time goes on. 