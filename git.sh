if [ "$1" == "" ]; then
    echo "You must set a message when commiting"
    exit
fi
echo \"$1\"
# git add .;
git commit -m $1;
# git push;
