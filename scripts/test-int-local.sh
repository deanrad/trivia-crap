set -ex
echo "Testing local server..."
# Webpack wildcards anything and doesnt proxy (if thru browser or text/html)
curl -fs -H Accept:text/html -o /dev/null http://localhost:3000/index.html
curl -fs -H Accept:text/html -o /dev/null http://localhost:3000/client
# Server answers directly
curl -fs -o /dev/null http://localhost:3001/server/ping
curl -fs -o /dev/null http://localhost:3001/
curl -fs -o /dev/null http://localhost:3001/live
curl -fs -o /dev/null http://localhost:3001/remote
# and 404s undefined routes
curl -fs -o /dev/null http://localhost:3001/not_found || echo "404 ok"
# Webpack proxies to server
OUT_3000=$(curl -fs http://localhost:3000/server/ping)
OUT_3001=$(curl -fs http://localhost:3001/server/ping)
test "$OUT_3000" = "$OUT_3001" || exit 1
