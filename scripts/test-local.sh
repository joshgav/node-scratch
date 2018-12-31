# it should build and run a container
# it should send a request and receive a response from the container
# if successful final command should return 0

org=joshgav
repo=node-scratch
ver=latest

cid=$(docker container list --quiet --filter "name=${repo}")
if [[ -n "$cid" ]]; then docker container stop ${cid}; fi

docker build -t ${org}/${repo}:${ver} .
docker run --detach --rm \
  --publish 8080:8080 \
  --name ${repo} \
  ${org}/${repo}:${ver}

sleep 2
curl http://localhost:8080
curl http://localhost:8080