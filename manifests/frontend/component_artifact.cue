package component

#Artifact: {
  ref: name:  "frontend"

  description: {

    srv: {
      server: {
        restapi: { protocol: "http", port: 3000 }
      }
      client: {
        evalclient: { protocol: "http" }
      }
    }

    config: {
      parameter: {
        appconfig: {
          endpoint: "http://localhost/"
        }
      }
      resource: {}
    }

    // Applies to the whole role
    size: {
      bandwidth: { size: 10, unit: "M" }
    }
    
    code: {

      frontend: {
        name: "frontend"

        image: {
          hub: { name: "", secret: "" }
          tag: "sibrocab/frontend:latest"
        }

        mapping: {
          // Filesystem mapping: map the configuration into the JSON file
          // expected by the component
          filesystem: {
            "/config/config.json": {
              data: value: config.parameter.appconfig
              format: "json"
            }
          }
          env: {
            CONFIG_FILE: value: "/config/config.json"
            HTTP_SERVER_PORT_ENV: value: "\(srv.server.restapi.port)"
          }
        }

        // Applies to each containr
        size: {
          memory: { size: 100, unit: "M" }
          mincpu: 100
          cpu: { size: 200, unit: "m" }
        }
      }
    }
  }
}
