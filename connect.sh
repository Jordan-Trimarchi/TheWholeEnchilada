case $1 in

postgres)
    scp -i SDC.pem ./init.sh ec2-user@ec2-18-216-104-2.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-18-216-104-2.us-east-2.compute.amazonaws.com
    ;;		
node)
    scp -i SDC.pem ./init.sh ec2-user@ec2-3-135-190-98.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-3-135-190-98.us-east-2.compute.amazonaws.com
    ;;
nginx)
scp -i SDC.pem ./init.sh ec2-user@ec2-18-222-144-163.us-east-2.compute.amazonaws.com	:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-18-222-144-163.us-east-2.compute.amazonaws.com	
    ;;
esac