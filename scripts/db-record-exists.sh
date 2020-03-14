set -ex
set RECORD=g2-trivia
echo "Testing db contains record $RECORD..."
mongo "$MONGODB_URI" --eval "db.games.find({id: 'g2-trivia'})" | grep _id