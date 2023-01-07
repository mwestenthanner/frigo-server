# frigo-server

This is the backend for the frigo-vue project, using a MongoDB cluster, Express and Mongoose. It's been tested on MongoDB Atlas, but should also be compatible with a self-hosted instance (tbd). 

## Caveats

Currently, text search is done via a regex to provide partial matches and ensure compatibility with self-hosted MongoDB. However, this kind of query is quite inefficient. 

This shouldn't be a problem for the intended use case (average household that has < 1000 products) but could be addressed in the future by implementing a nGram approach.