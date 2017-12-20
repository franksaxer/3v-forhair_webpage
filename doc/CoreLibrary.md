# Core Library
The client and server implementations need to share some content. It is called the _core_. Necessary to share the same data sets is used for the editor router. This provides the functionality for the client to adjust the web-pages content. Therefore both participants have to make sure, they talk about the same content.

## Data Manager
Cause both participants are working with different framworks the cores content is defined in _JSON_ format. Each party has to implement its own _DataManager_ to work with these datasets. It should be the only thing that handle the differences between the components. The rest should be distinkt.

## Share
The client, as well as the server, does not work without the core libary. Therefore the core provides a share script `shareCore.sh`. Changes to the content should only applied here. Adaptions in the components will have no effect cause they are ignored. If the core libary gets adjusted, each developer is responsible to update its own sources. Of cause this is also necessary on the very beginning.
