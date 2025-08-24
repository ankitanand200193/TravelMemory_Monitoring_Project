# End-to-End MERN Deployment & Monitoring

## Objective

Deploy and monitor a MERN app using Terraform, Ansible, Prometheus & Grafana with AWS infrastructure.

## Results:

### Terraform_Provisioning:
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
![Alt]


## Application Repo

[TravelMemory](https://github.com/UnpredictablePrashant/TravelMemory)

## EC2 Instances

| Service         | EC2 name   | 
| --------------- | ---------- |
| MERN Web Server | web-server |
| MongoDB Server  | db-server  |

## Ports

| Service    | Ports                                       |
| ---------- | --------------------------------------------|
| Web Server | 22, 80, 443, 9100, 9090, 9216               |
| DB Server  | 22, 27017, 9216 (from web server)           |

## Architecture Diagram

```
+----------------+            +----------------+
| MERN Web Server| --------> | MongoDB Server |
| (Node.js/React)|           | (MongoDB + Exp)|
+----------------+            +----------------+
         |
         v
  +--------------+
  |  Prometheus  |
  +--------------+
         |
         v
   +------------+
   |  Grafana   |
   +------------+
```

## Screenshots

* Terraform Outputs: `![Terraform](path/to/screenshot.png)`
* Grafana Dashboards: `![Dashboard](path/to/screenshot.png)`
* Alert Config: `![Alerts](path/to/screenshot.png)`

## Common Commands

**Terraform:**

```
terraform init
terraform plan
terraform apply
terraform destroy
terraform output
```

**Ansible:**

```
ansible-playbook -i inventory.ini main.yml

```

**Node.js/Frontend:**

```
npm install
npm run start
```

## Quick Q\&A

| Q                      | A                                            |
| ---------------------- | -------------------------------------------- |
| What is `prom-client`? | Node.js lib to expose metrics for Prometheus |
| MongoDB Exporter?      | Collects DB metrics for Prometheus           |
| Restrict DB access?    | Security groups allow only web server IP     |
| Separate EC2 for DB?   | Security & scalability                       |
| Grafana alerts?        | Notify on errors, slow APIs, DB issues       |





`.env` file to work with the backend after creating a database in mongodb: 

```
MONGO_URI='ENTER_YOUR_URL'
PORT=3001
```


For frontend, you need to create `.env` file and put the following content (remember to change it based on your requirements):
```bash
REACT_APP_BACKEND_URL=http://localhost:3001
```
