ng b app-lib
case "$1" in
   'home')
       echo "====================OPEN--Home项目=========================="
       ng serve home-test --open --port 8888
     ;;
   'p1')
       echo "====================OPEN--pool1-test项目=========================="
       ng serve pool1-test --open --port 8888
   ;;
   'p2')
       echo "====================OPEN--pool2-test项目=========================="
       ng serve pool2-test --open --port 8888
   ;;
   'p3')
       echo "====================OPEN--pool3-test项目=========================="
       ng serve pool3-test --open --port 8888
   ;;
   's1')
       echo "====================OPEN--stake1-test项目=========================="
       ng serve stake1-test --open --port 8888
   ;;
   's2')
       echo "====================OPEN--stake2-test项目=========================="
       ng serve stake2-test --open --port 8888
   ;;
   's3')
       echo "====================OPEN--stake3-test项目=========================="
       ng serve stake3-test --open --port 8888
   ;;
  's4')
       echo "====================OPEN--stake4-test项目=========================="
       ng serve stake4-test --open --port 8888
   ;;
   'pay')
       echo "====================OPEN--pay-test项目=========================="
       ng serve payment-test --open --port 8888
   ;;
   *)
esac
