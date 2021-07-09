# Raft Sync Server

## How it works
### When Starting & stoping the game:
* Connect to FTP Server
* Compare Timestamp from "20XX.XX.XX-XX.XX-Latest"-folder
* if newerOnServer:
    * get
    * Decompress World folder
* else:
    * put
    * Compresses World folder
    * Upload to FTP Server

* wait(untilGameIsStopped):
    * same as above

## Set Steam wrapper
https://www.reddit.com/r/linux_gaming/comments/969vm4/running_a_shell_script_when_steam_games_launch/


## NPM ftp
https://www.npmjs.com/package/ftp