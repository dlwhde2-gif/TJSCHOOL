const fs = require('fs');
const path = require('path');

const fixFiles = [
  'src/components/Header.jsx',
  'src/components/Footer.jsx',
  'src/components/HeroSlider.jsx',
  'src/app/layout.jsx',
  'src/pages/GreetingsPage.jsx',
  'src/pages/GoalsPage.jsx',
  'src/pages/AdmissionPage.jsx',
  'src/pages/MapPage.jsx',
  'src/pages/RegisterPage.jsx',
  'src/pages/LoginPage.jsx'
];

const corrections = {
  '?몄궽': '인사말',
  '援먯쑁紐⑺몴': '교육목표',
  '?숆탳?고쁺': '학교연혁',
  '?ㅼ떆??湲?': '오시는 길',
  '?낇븰?덈궡': '입학안내',
  '珥덈벑?낇븰?덈궡': '초등입학안내',
  '以묐벑?낇븰?덈궡': '중등입학안내',
  '?낇븰?곷떞': '입학상담',
  '援먯쑁怨쇱젙': '교육과정',
  '以묐벑援먯쑁怨쇱젙': '중등교육과정',
  '珥덈벑援먯쑁怨쇱젙': '초등교육과정',
  '?멸뎅?닿탳??': '외국어교육',
  '?숆탳?앺솢': '학교생활',
  '?ъ쭊媛ㅻ윭由?': '사진갤러리',
  '?곸긽媛ㅻ윭由?': '영상갤러리',
  '蹂대룄?먮즺': '보도자료',
  '而ㅻ??덊떚': '커뮤니티',
  '怨듭??ы빆': '공지사항',
  '媛€?뺥넻?좊Ц': '가정통신문',
  '?쒖떇?ㅼ슫濡쒕뱶': '서식다운로드',
  '濡쒓렇??': '로그인',
  '濡쒓렇?꾩썐': '로그아웃',
  '諛⑷낵???좎껌': '방과후 신청',
  '??': '님',
  '?몄긽??蹂€?붿떆?ㅻ뒗': '세상을 변화시키는',
  '湲€濡쒕쾶 由щ뜑': '글로벌 리더',
  '李쎌쓽?€ ?댁젙??媛€?앺븳 諛곗??': '창의와 열정이 가득한 배움터',
  '誘몃옒瑜? ?ν븳 ?딆엫?녿뒗 ?꾩쟾': '미래를 향한 끊임없는 도전'
};

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const file of fixFiles) {
  const fullPath = path.resolve(file);
  try {
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping: ${file} (not found)`);
      continue;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    for (const [key, value] of Object.entries(corrections)) {
      content = content.replace(new RegExp(escapeRegex(key), 'g'), value);
    }
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed: ${file}`);
  } catch (err) {
    console.error(`Error fixing ${file}: ${err.message}`);
  }
}
