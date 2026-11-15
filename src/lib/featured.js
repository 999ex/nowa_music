/**
 * いま売り出している曲。最初の画面の1枚目の写真・再生ボタン・配信ボタンがこの曲になる。
 * 曲を替えるときは、ここと src/assets/brand/ の写真を差し替える。
 * 配信のリンクは TuneCore の曲ページ（linkco.re）に載っている各サービスへの入口。
 */
export const FEATURED = {
  title: 'Unspoken Feelings -Silence-',
  shortTitle: 'Unspoken Feelings',
  // サイト内で再生する YouTube の動画（フル尺）
  youtubeId: 'Hg9O3nvI-Hk',
  page: 'https://linkco.re/U28dRnuB',
  links: [
    { label: 'Apple Music', url: 'https://www.tunecore.co.jp/to/apple_music/2038305' },
    { label: 'Spotify', url: 'https://www.tunecore.co.jp/to/spotify/2038305' },
    { label: 'YouTube', url: 'https://www.youtube.com/watch?v=Hg9O3nvI-Hk' },
  ],
};
