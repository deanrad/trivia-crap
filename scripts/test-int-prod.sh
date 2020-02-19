set -ex
echo "Testing prod server..."
# Webpack serves up static files
curl -fs -o /dev/null -H Accept:text/html  https://g2-trivia.herokuapp.com/index.html

# Server does API routes
SERVER_OUT=$(curl -fs https://g2-trivia.herokuapp.com/server/ping)
test "$SERVER_OUT" = "server lives" || exit 1
