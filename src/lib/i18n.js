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
    siteDescription: '言葉にできなかった想いを、音楽に。Nowa Musicは、過去の恋や伝えられなかった想いを、音楽・映像・物語で届けるJ-POPバラードのアーティストブランドです。',
    nav: { label: 'メインメニュー', music: 'MUSIC', about: 'ABOUT', listen: 'LISTEN' },
    footer: { message: '言葉にできなかった想いを、音楽に。', links: '外部リンク', analytics: '当サイトではGoogleアナリティクスを使用しています。' },
    player: { label: 'プレイヤー', close: '閉じる' },
    trackCount: (n) => `${n}曲`,
    home: {
      heroCopy: ['言葉にできなかった想いを、', '音楽に。'],
      heroSub: ['あの頃、伝えられなかった気持ち。', '今も心に残る、忘れられない人。'],
      heroCta: 'MUSICを聴く',
      storyTitle: ['あの日、', '言えなかった言葉がある。'],
      storyLines: ['好きだったのに、言えなかった。', '本当は、引き止めたかった。', 'あのとき、もっと素直になれていたら。'],
      scenes: [
        ['ふとした夜に、', '思い出す人がいる。'],
        ['伝えられなかった言葉が、', '今も心に残っている。'],
        ['何も変わらない街に、', 'あの人だけがいない。'],
        ['戻れない時間も、', '大切な思い出だった。'],
        ['あの恋があって、', 'よかった。'],
      ],
      musicTitle: '心に残る、恋の物語。',
      musicSub: ['あの頃の想いを、もう一度。', 'Nowa MusicのオリジナルJ-POPバラード。'],
      latest: '最新アルバム',
      albums: 'アルバム・プレイリスト',
      singles: 'シングル',
      playLatest: '再生する',
      allAlbums: 'すべてのアルバムを見る',
      aboutCopy: ['言えなかった想いも、', '愛した証だから。'],
      aboutBody: [
        ['Nowa Musicは、過去の恋愛や、あのとき伝えられなかった想いを、音楽・映像・物語で表現するアーティストブランドです。'],
        ['忘れられない人。', '戻れない時間。', '今も心に残る、あの日の言葉。'],
        ['そんな記憶にそっと寄り添い、切なかった思い出が、いつか優しい記憶に変わっていく。'],
        ['Nowa Musicは、そんな音楽を届けています。'],
      ],
      readMore: 'もっと読む',
      listenTitle: ['あなたの記憶に、', 'そっと寄り添う音楽を。'],
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
    siteDescription: 'The feelings I could never put into words, turned into music. Nowa Music tells stories of past loves and unspoken feelings through J-POP ballads, visuals and stories.',
    nav: { label: 'Main menu', music: 'MUSIC', about: 'ABOUT', listen: 'LISTEN' },
    footer: { message: 'The feelings I could never put into words, turned into music.', links: 'External links', analytics: 'This site uses Google Analytics.' },
    player: { label: 'Player', close: 'Close' },
    trackCount: (n) => `${n} ${n === 1 ? 'track' : 'tracks'}`,
    home: {
      heroCopy: ['The feelings I could never put into words,', 'turned into music.'],
      heroSub: ['The words I could not say back then.', 'The one I still cannot forget.'],
      heroCta: 'Listen to the music',
      storyTitle: ['There are words', 'I could not say that day.'],
      storyLines: ['I loved you, but I never said it.', 'I wanted to ask you to stay.', 'If only I had been more honest then.'],
      scenes: [
        ['On some quiet nights,', 'someone comes back to mind.'],
        ['The words I never said', 'still remain in my heart.'],
        ['The city has not changed at all,', 'only you are gone.'],
        ['Even the time I cannot return to', 'was a precious memory.'],
        ['I am glad', 'that love happened.'],
      ],
      musicTitle: 'Love stories that stay with you.',
      musicSub: ['Feel those days once more.', 'Original J-POP ballads by Nowa Music.'],
      latest: 'Latest album',
      albums: 'Albums & playlists',
      singles: 'Singles',
      playLatest: 'Play',
      allAlbums: 'See all albums',
      aboutCopy: ['Even unspoken feelings', 'are proof that you loved.'],
      aboutBody: [
        ['Nowa Music is an artist brand that expresses past loves, and the feelings that could not be said at the time, through music, visuals and stories.'],
        ['Someone you cannot forget.', 'Time you cannot return to.', 'Words from that day that still remain.'],
        ['Staying gently beside those memories, until bittersweet moments slowly become tender ones.'],
        ['That is the music Nowa Music creates.'],
      ],
      readMore: 'Read more',
      listenTitle: ['Music that stays gently', 'beside your memories.'],
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
    siteDescription: '말로 하지 못한 마음을, 음악으로. Nowa Music은 지난 사랑과 전하지 못한 마음을 음악·영상·이야기로 전하는 J-POP 발라드 아티스트 브랜드입니다.',
    nav: { label: '메인 메뉴', music: 'MUSIC', about: 'ABOUT', listen: 'LISTEN' },
    footer: { message: '말로 하지 못한 마음을, 음악으로.', links: '외부 링크', analytics: '이 사이트는 Google 애널리틱스를 사용합니다.' },
    player: { label: '플레이어', close: '닫기' },
    trackCount: (n) => `${n}곡`,
    home: {
      heroCopy: ['말로 하지 못한 마음을,', '음악으로.'],
      heroSub: ['그때 전하지 못한 마음.', '지금도 마음에 남은, 잊을 수 없는 사람.'],
      heroCta: 'MUSIC 듣기',
      storyTitle: ['그날,', '하지 못한 말이 있다.'],
      storyLines: ['좋아했는데, 말하지 못했다.', '사실은 붙잡고 싶었다.', '그때, 조금 더 솔직했더라면.'],
      scenes: [
        ['문득 찾아온 밤에,', '떠오르는 사람이 있다.'],
        ['전하지 못한 말이,', '지금도 마음에 남아 있다.'],
        ['아무것도 변하지 않은 거리에,', '그 사람만 없다.'],
        ['돌아갈 수 없는 시간도,', '소중한 추억이었다.'],
        ['그 사랑이 있어서,', '다행이었다.'],
      ],
      musicTitle: '마음에 남는, 사랑 이야기.',
      musicSub: ['그때의 마음을, 다시 한번.', 'Nowa Music의 오리지널 J-POP 발라드.'],
      latest: '최신 앨범',
      albums: '앨범 · 플레이리스트',
      singles: '싱글',
      playLatest: '재생',
      allAlbums: '모든 앨범 보기',
      aboutCopy: ['말하지 못한 마음도,', '사랑했다는 증거니까.'],
      aboutBody: [
        ['Nowa Music은 지난 사랑과 그때 전하지 못한 마음을 음악·영상·이야기로 표현하는 아티스트 브랜드입니다.'],
        ['잊을 수 없는 사람.', '돌아갈 수 없는 시간.', '지금도 마음에 남은 그날의 말.'],
        ['그런 기억 곁에 살며시 머물며, 아팠던 추억이 언젠가 따뜻한 기억으로 바뀌어 갑니다.'],
        ['Nowa Music은 그런 음악을 전합니다.'],
      ],
      readMore: '더 읽기',
      listenTitle: ['당신의 기억 곁에,', '살며시 머무는 음악을.'],
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
