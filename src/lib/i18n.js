/** 対応言語。ja が既定（URLに接頭辞なし）、en は /en/ 配下。 */
export const LANGS = ['ja', 'en', 'ko'];

/** 言語切り替えの表示名と og:locale。 */
export const LANG_META = {
  ja: { short: 'JA', name: '日本語', locale: 'ja_JP' },
  en: { short: 'EN', name: 'English', locale: 'en_US' },
  ko: { short: 'KO', name: '한국어', locale: 'ko_KR' },
};
export const DEFAULT_LANG = 'ja';

/** パスの先頭の言語接頭辞（/en/ など）から言語を返す。なければ ja。 */
export const langFromPath = (pathname) =>
  LANGS.find((l) => l !== DEFAULT_LANG && (pathname === `/${l}` || pathname.startsWith(`/${l}/`))) ?? DEFAULT_LANG;

/** 言語接頭辞を外したパス（/en/music/ → /music/）。 */
export const stripLang = (pathname) => {
  const stripped = pathname.replace(/^\/(en|ko)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
};

/** 指定言語でのパス。path は接頭辞なしのサイト内パス（/music/ や /#listen）。 */
export const localePath = (lang, path = '/') => (lang === DEFAULT_LANG ? path : `/${lang}${path}`);

// 文章の「行」は配列で持つ。日本語は読点などで区切って <br> にするため。
export const messages = {
  ja: {
    htmlLang: 'ja',
    siteDescription: '夜にそっと寄り添う、女性ボーカルのJ-POPバラード。眠れない夜、疲れた夜、ひとりで過ごす時間に。',
    nav: { label: 'メインメニュー', music: 'MUSIC', about: 'ABOUT', listen: 'LISTEN' },
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
  ko: {
    htmlLang: 'ko',
    siteDescription: '밤에 조용히 곁을 지켜 주는, 여성 보컬의 J-POP 발라드. 잠 못 드는 밤, 지친 밤, 혼자 보내는 시간에.',
    nav: { label: '메인 메뉴', music: 'MUSIC', about: 'ABOUT', listen: 'LISTEN' },
    footer: { links: '외부 링크', analytics: '이 사이트는 Google 애널리틱스를 사용합니다.' },
    player: { label: '플레이어', close: '닫기' },
    trackCount: (n) => `${n}곡`,
    home: {
      heroCopy: ['잠 못 드는 밤에,', '하나의 사랑 이야기를.'],
      heroPlay: '오늘 밤의 한 장 듣기',
      words: [
        ['말하지 못한 채', '끝나 버린 사랑이 있다.'],
        ['잊었을 터인 이름이', '문득 떠오르는 밤이 있다.'],
        ['그 마음에', '살며시 노래를 붙이고 있습니다.'],
      ],
      albumTitle: '잠들기 전까지의 시간에, 살며시.',
      allAlbums: '모든 앨범 보기',
      aboutTitle: 'Nowa 소개',
      aboutText: [
        '잠 못 드는 밤, 지친 밤, 혼자 보내는 시간에.',
        '오리지널 싱글과 천천히 틀어 둘 수 있는 1시간짜리 플레이리스트를 전해 드립니다.',
      ],
      readMore: '더 읽기',
      listenTitle: '들을 수 있는 곳',
    },
    music: {
      title: '밤이 끝날 때까지, 틀어 둘 수 있는 노래.',
      description: 'Nowa Music의 앨범과 최신 곡. 밤에 조용히 곁을 지켜 주는 여성 보컬의 J-POP 발라드.',
      more: '더 듣기 (YouTube 채널)',
    },
    about: {
      description: 'Nowa Music 소개. 밤에 조용히 곁을 지켜 주는, 여성 보컬의 J-POP 발라드.',
      facts: [
        { label: '장르', value: 'J-POP / 발라드 / 여성 보컬' },
        { label: '활동 시작', value: '2025년 8월' },
        { label: '스트리밍', value: 'Spotify / Apple Music / YouTube Music 외' },
        { label: '업데이트', value: '매주 월요일 21:00 JST(앨범) / 수시(싱글)' },
      ],
      paragraphs: [
        ['Nowa(노와)는 혼자인 밤에 듣는 노래를 만들고 있습니다.'],
        ['노래로 만드는 것은 말하지 못했던 마음입니다. 그때 이렇게 말했더라면, 그때 이렇게 했더라면. 그런 "만약에"를 누구나 하나쯤은 품고 있다고 생각합니다.'],
        ['시간이 지날수록 그 마음은 사라지기는커녕 모양을 바꿔 조용히 남습니다. 일을 마치고 방의 불을 낮춘 밤, 문득 그 시절의 풍경이 되돌아오곤 합니다.'],
        ['Nowa의 노래는 그 시간을 위해 있습니다.'],
        ['잊지 않아도 괜찮아요. 억지로 앞을 보지 않아도 괜찮아요. 그저 그 마음 곁에 음악이 있으면 됩니다.'],
        ['그렇게 생각하며 한 곡 한 곡 만들고 있습니다.'],
        ['오리지널 곡과 밤새 틀어 둘 수 있는 1시간짜리 플레이리스트를 매주 전해 드립니다.'],
        ['오늘 밤도 부디 평온한 시간이 되기를.'],
      ],
    },
  },
};
