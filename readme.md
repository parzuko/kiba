# 🚨 Currently Under Dev

## Kiba V3: Remote Code Execution Engine

> This project is built using NodeJs, and Docker. It is inspired from [Piston]()

### To do
1. Finish API
2. Create Docker Containers
3. Start Hosting
4. Create IDE


#### Notes while running:

This project uses `no-camel`. Essentially, instead of using traditional camelCase, it will be using `snake_script`

Currently, structure looks like

```
api
    src
        api
            kiba.js
        index.js
docker-compose.yaml
```

At `src/index.js` the main express app starts. It calls the api inside `api/kiba` and we have our first route working at the moment using `node index`:

```bash
# to run 
docker-compose up -d

```


## Setup Details
If you want to run docker as non-root user then you need to add it to the docker group.
1. Create the docker group if it does not exist
`$ sudo groupadd docker`
2. Add your user to the docker group.
`$ sudo usermod -aG docker $USER`
3. Run the following command or Logout and login again and run (that doesn't work you may need to reboot your machine first)
`$ newgrp docker`
4. Check if docker can be run without root
`$ docker-compose up`
5. Reboot if still got error
`$ reboot`

Taken from the docker official documentation: [manage-docker-as-a-non-root-user](https://docs.docker.com/engine/install/linux-postinstall/)




### `GET /api/status`
Currently returns all good boss


