npm b app-lib
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
   's1')
       echo "====================OPEN--stake1-test项目=========================="
       ng serve stake1-test --open --port 8888
   ;;
   's2')
       echo "====================OPEN--stake2-test项目=========================="
       ng serve stake2-test --open --port 8888
   ;;
   *)
esac