# apple_music_slack_updates
> Update your slack status with the current song playing via the Music.app

### Why?

I tried to run https://github.com/sbdchd/apple-music-to-slack but I'm guessing some libraries aren't compatible with the current version of Rust. I'm too busy to learn Rust, so I decided to write my own version of the script.

## Setup

1. Clone the repo
2. Install [Bun](https://bun.sh)
3. Create a [new Slack app](https://api.slack.com/apps?new_app=1)
4. Visit the OAuth & Permissions page and add the following User scopes:
    - `users.profile:read`
    - `users.profile:write`
5. Scroll to the top and click "Install to Workspace"
6. Copy and store the User OAuth Token and replace `xoxp-REPLACE-ME` in `xyz.j1support.music.slack.status.plist` with your token

## Install

> [!CAUTION]
> Always review code before running it on your computer!

1. Run the following command to install the script:
    ```bash
    sudo bun run install
    ```

This command will build the script, copy the executable to `/usr/local/bin/apple_music_slack_status_updates`, copy the startup plist to `/Library/LaunchAgents/xyz.j1support.music.slack.status.plist`, and load the startup plist.

When installed, you will see a new item by [Jarred Sumner](https://x.com/jarredsumner?lang=en), the creator of Bun, in the "Startup Items" section of your System Preferences.

## Uninstall

1. Run the following command to uninstall the script:
    ```bash
    sudo bun run uninstall
    ```