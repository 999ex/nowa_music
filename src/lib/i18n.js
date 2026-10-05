/** 対応言語。ja が既定（URLに接頭辞なし）、en は /en/ 配下。 */
export const LANGS = ['ja', 'en'];
export const DEFAULT_LANG = 'ja';

/** パスの先頭が /en/ なら en、それ以外は ja。 */
export const langFromPath = (pathname) =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LANG;

/** 言語接頭辞を外したパス（/en/music/ → /music/）。 */
export const stripLang = (pathname) => {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
};

/** 指定言語でのパス。path は接頭辞なしのサイト内パス（/music/ や /#listen）。 */
export const localePath = (lang, path = '/') => (lang === DEFAULT_LANG ? path : `/en${path}`);

// 文章の「行」は配列で持つ。日本語は読点などで区切って <br> にするため。
export const messages = {
  ja: {
    htmlLang: 'ja',
    siteDescription: '夜にそっと寄り添う、女性ボーカルのJ-POPバラード。眠れない夜、疲れた夜、ひとりで過ごす時間に。',
    nav: { label: 'メインメニュー', music: 'MUSIC', about: 'ABOUT', listen: 'LISTEN' },
    langSwitch: { label: 'English', short: 'EN' },
    footer: { links: '外部リンク', analytics: '当サイトではGoogleアナリティクスを使用しています。' },
    player: { label: 'プレイヤー', close: '閉じる' },
    trackCount: (n) => `${n}曲`,
    home: {
      heroCopy: ['眠れない夜に、', 'ひとつの恋の物語を。'],
      heroPlay: '今夜の1枚を聴く',
      words: [
        ['言えないまま、', '終わってしまった恋がある。'],
        ['忘れたはずの名前が、', 'ふいに浮かぶ夜がある。'],
        ['その気持ちに、', 'そっと歌をつけています。'],
      ],
      albumTitle: '眠りにつくまでの時間に、そっと。',
      allAlbums: 'すべてのアルバムを見る',
      aboutTitle: 'Nowa について',
      aboutText: ['眠れない夜、疲れた夜、ひとりで過ごす時間に。', 'オリジナルの単曲と、ゆっくり流せる1時間のプレイリストをお届けしています。'],
      readMore: 'もっと読む',
      listenTitle: '聴けるところ',
    },
    music: {
      title: '夜が終わるまで、流していられる歌。',
      description: 'Nowa Music のアルバムと最新の楽曲。夜にそっと寄り添う女性ボーカルのJ-POPバラード。',
      more: 'もっと聴く（YouTubeチャンネル）',
    },
    about: {
      description: 'Nowa Music について。夜にそっと寄り添う、女性ボーカルのJ-POPバラード。',
      facts: [
        { label: 'ジャンル', value: 'J-POP / バラード / 女性ボーカル' },
        { label: '活動開始', value: '2025年8月' },
        { label: '配信', value: 'Spotify / Apple Music / YouTube Music ほか' },
        { label: '更新', value: '毎週月曜 21:00（アルバム）/ 随時（単曲）' },
      ],
      paragraphs: [
        ['Nowa（ノワ）は、ひとりの夜に聴く歌をつくっています。'],
        ['歌にしているのは、言えなかった気持ちのことです。', 'あの時こう言えていたら、あの時こうしていたら。', 'そんな「もしも」を、誰もがひとつは持っていると思います。'],
        ['時間が経つほど、その気持ちは消えるどころか、', 'かたちを変えて、静かに残り続けます。', '仕事を終えて、部屋の明かりを落とした夜。', 'ふいに、あの頃の景色が戻ってくることがあります。'],
        ['Nowaの歌は、その時間のためにあります。'],
        ['忘れなくていい。', '無理に前を向かなくてもいい。', 'ただ、その気持ちのそばに、音楽があればいい。'],
        ['そう思いながら、一曲ずつ作っています。'],
        ['オリジナルの楽曲と、', '夜のあいだ流し続けられる1時間のプレイリストを、', '毎週お届けしています。'],
        ['今夜も、どうか穏やかな時間になりますように。'],
      ],
    },
  },
  en: {
    htmlLang: 'en',
    siteDescription: 'Gentle J-POP ballads with female vocals, for sleepless nights, tired evenings and time spent alone.',
    nav: { label: 'Main menu', music: 'MUSIC', about: 'ABOUT', listen: 'LISTEN' },
    langSwitch: { label: '日本語', short: 'JA' },
    footer: { links: 'External links', analytics: 'This site uses Google Analytics.' },
    player: { label: 'Player', close: 'Close' },
    trackCount: (n) => `${n} ${n === 1 ? 'track' : 'tracks'}`,
    home: {
      heroCopy: ['On sleepless nights,', 'a story of one love.'],
      heroPlay: "Listen to tonight's pick",
      words: [
        ['There is a love that ended', 'before it could be said.'],
        ['There are nights when a name', 'you thought you had forgotten comes back.'],
        ['I set a quiet song', 'to those feelings.'],
      ],
      albumTitle: 'Quietly, until you fall asleep.',
      allAlbums: 'See all albums',
      aboutTitle: 'About Nowa',
      aboutText: [
        'For sleepless nights, tired evenings, and time spent alone.',
        'Original songs, and one-hour playlists you can leave playing softly.',
      ],
      readMore: 'Read more',
      listenTitle: 'Where to listen',
    },
    music: {
      title: 'Songs to keep playing until the night ends.',
      description: 'Albums and new songs from Nowa Music. Gentle J-POP ballads with female vocals.',
      more: 'Listen more (YouTube channel)',
    },
    about: {
      description: 'About Nowa Music. Gentle J-POP ballads with female vocals that stay beside you at night.',
      facts: [
        { label: 'Genre', value: 'J-POP / Ballad / Female vocals' },
        { label: 'Active since', value: 'August 2025' },
        { label: 'Streaming', value: 'Spotify / Apple Music / YouTube Music and more' },
        { label: 'Updates', value: 'Every Monday 21:00 JST (albums) / as released (singles)' },
      ],
      paragraphs: [
        ['Nowa writes songs to listen to on nights spent alone.'],
        ['The songs are about feelings that were never said. If only I had said this then. If only I had done that. I think everyone carries a few of those "what ifs."'],
        ['As time passes, those feelings do not fade; they change shape and quietly remain. On a night after work, with the lights turned down, scenes from those days sometimes come back without warning.'],
        ["Nowa's songs exist for that moment."],
        ['You do not have to forget. You do not have to force yourself to move on. It is enough if there is music beside those feelings.'],
        ['That is what I think about as I make each song, one at a time.'],
        ['Every week, I share original songs and one-hour playlists you can leave playing through the night.'],
        ['May tonight, too, be a peaceful one.'],
      ],
    },
  },
};
