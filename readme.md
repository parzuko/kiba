# 🚨 Currently Under Dev

## Kiba V3: Remote Code Execution Engine

> This project is built using NodeJs, and Docker. It is inspired from [Piston]()

```bash
# to clone
git clone https://github.com/parzuko/kiba

# run container
docker-compose up -d api

# install packages using cli (once only)
chmod +x cli/index.js   # only if not root user
cli/index.js kpack install <package> # any language python, java, gcc
```
## Package Control

To check installed packages and potentially install more:

```bash
cli/index.js kpack list 
# • gcc 10.2.0
# • java 15.0.2
# • python 3.9.4
cli/index.js kpack install java
```



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




## Setup Details
If you want to run docker as non-root user then you need to add it to the docker group.
```bash
# 1. Create the docker group if it does not exist
$ sudo groupadd docker
# 2. Add your user to the docker group.
$ sudo usermod -aG docker $USER
# 3. Run the following command or Logout and login again and run (that doesn't work you may need to reboot your machine first)
$ newgrp docker
#4. Check if docker can be run without root
$ docker-compose up
#5. Reboot if still got error
$ reboot
```
Taken from the docker official documentation: [manage-docker-as-a-non-root-user](https://docs.docker.com/engine/install/linux-postinstall/)




### `GET /api/status`
Currently returns all good boss

### `GET /api/packages`
Returns All Installed Runtimes
