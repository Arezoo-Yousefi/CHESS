goal: designing a network chess which does not have an opportunity to play with camputer but prepare an environment for players to play together.


The client-side is responsible for: 
- Register the client's name 
- Create a new game with name to the server 
- Connecting to an existing game as a player \\or a viewer
- Showing chessboard and pieces and cells' border
- Sending player actions \\click
- Getting latest status of cells' border and pieces periodically \\refresh
 
The server-side is responsible for:
- \\Keep a list of games
- Keep latest status of chessboard and pieces 
- keep latest action, calculate legal moves
- Create a new game upon a request
- \\Create a list of current games and send it to the client upon a request
- Connect a player or \\viewer to the current game upon a request
- Getting players actions and update status
- \\Check and checkmate