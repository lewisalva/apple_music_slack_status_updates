const SLEEP_TIME = 10 * 1000; // 10 seconds
const SLACK_SECRET_TOKEN = process.env['SLACK_SECRET_TOKEN']

if (!SLACK_SECRET_TOKEN) {
  console.error('SLACK_SECRET_TOKEN environment variable is required');
  process.exit(1);
}

// replace/add custom emojis in any position
const emojis = [
  ":notes:",
  ":musical_keyboard:",
  ":control_knobs:",
  ":musical_score:",
  ":violin:",
  ":saxophone:",
];

const randomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

const nearestRoundedUpMinute = (timestamp: number) => {
  return Math.ceil(timestamp / 60) * 60;
}

const calculateExpiration = (duration: number) => {
  return nearestRoundedUpMinute((Date.now() / 1000)) + nearestRoundedUpMinute(duration);
}

let previousSongArtist = '';

const main = async () => {
  const musicStatus = (await Bun.$`osascript -l JavaScript -e 'Application("Music").running() && Application("Music").playerState()'`).text().trim();

  if (musicStatus === 'playing') {
    const currentTrack = (await Bun.$`osascript -l JavaScript -e 'JSON.stringify(Application("Music").currentTrack.properties())'`).json();
    const currentSongArtist = `${currentTrack.name} - ${currentTrack.artist}`;
    
    if (previousSongArtist !== currentSongArtist) {
      previousSongArtist = currentSongArtist;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${SLACK_SECRET_TOKEN}`);
      myHeaders.append("Content-Type", "application/json")
      fetch("https://slack.com/api/users.profile.set", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ profile: { status_text: currentSongArtist, status_emoji: randomEmoji(), status_expiration: calculateExpiration(currentTrack.duration)} })
      })
        .catch((error) => console.error(error));
    }
  };
}

while (true) {
  main();
  await Bun.sleep(SLEEP_TIME);
}