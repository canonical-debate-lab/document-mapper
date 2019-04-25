# document-mapper
Visual web tool for creating argument maps based on web or other text document content

## Install ArangoDB
If you haven't already, you need to install the [ArangoDB](https://arangodb.com/) database, version 3.1 or later.


## Install Golang
This project uses the new default dependency management tool that has been available since Golang version 1.11. If you haven't already, go to the [Go Programming Language install page](https://golang.org/doc/install) for instructions on how to get it set up in your environment.

## Install ArangoMiGO
ArangoDB schema creation and migration is managed via the [ArangoMiGO](https://github.com/deusdat/arangomigo) tool.

## Set up this project
If you haven't already, clone this project to a local folder.

## Create the database
First, you must create a local configuration file, as required by ArangoMiGO. An example is located in the file `migrations/config.example` of this project. You can make a copy, and then edit the copy to set your own variables.

```bash
cp migrations/config.example migrations/config
echo "I will use the best editor"
emacs migrations/config
```

At a minimum, you will need to customize the `migrationspath` configuration, and the `username` and `password` in `extras`. You should also change the ArangoDB `username` and `password` for the root user if you didn't use the default configurations.

Next, make sure your ArangoDB server is running:

```bash
/usr/local/opt/arangodb/sbin/arangod
```

Finally, run the ArangoMiGO utility to install the database collections and edges.

```bash
arangomigo migrations/config
```

