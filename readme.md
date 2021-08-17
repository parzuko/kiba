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

### `GET /api/kiba`
Currently returns all good boss


