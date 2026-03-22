const fs = require('fs');
const path = require('path');

const routes = {
  '(main)/about/greetings': "import GreetingsPage from '../../../../pages/GreetingsPage'; export default function Page() { return <GreetingsPage />; }",
  '(main)/about/goals': "import GoalsPage from '../../../../pages/GoalsPage'; export default function Page() { return <GoalsPage />; }",
  '(main)/about/history': "import HistoryPage from '../../../../pages/HistoryPage'; export default function Page() { return <HistoryPage />; }",
  '(main)/about/map': "import MapPage from '../../../../pages/MapPage'; export default function Page() { return <MapPage />; }",
  '(main)/about/admission': "import AdmissionPage from '../../../../pages/AdmissionPage'; export default function Page() { return <AdmissionPage />; }",
  '(main)/about/admission/middle': "import AdmissionPage from '../../../../../pages/AdmissionPage'; export default function Page() { return <AdmissionPage />; }",
  '(main)/about/admission/qna': "import MapPage from '../../../../../pages/MapPage'; export default function Page() { return <MapPage />; }",
  
  '(main)/curriculum/middle': "import CurriculumPage from '../../../../../pages/CurriculumPage'; const nav = [{name:'중등교육과정',path:'/curriculum/middle'},{name:'초등교육과정',path:'/curriculum/elementary'},{name:'외국어교육',path:'/curriculum/language'}]; export default function Page() { return <CurriculumPage mainCategory='교육과정' subCategory='중등교육과정' navItems={nav} />; }",
  '(main)/curriculum/elementary': "import CurriculumPage from '../../../../../pages/CurriculumPage'; const nav = [{name:'중등교육과정',path:'/curriculum/middle'},{name:'초등교육과정',path:'/curriculum/elementary'},{name:'외국어교육',path:'/curriculum/language'}]; export default function Page() { return <CurriculumPage mainCategory='교육과정' subCategory='초등교육과정' navItems={nav} />; }",
  '(main)/curriculum/language': "import CurriculumPage from '../../../../../pages/CurriculumPage'; const nav = [{name:'중등교육과정',path:'/curriculum/middle'},{name:'초등교육과정',path:'/curriculum/elementary'},{name:'외국어교육',path:'/curriculum/language'}]; export default function Page() { return <CurriculumPage mainCategory='교육과정' subCategory='외국어교육' navItems={nav} />; }",

  '(main)/life/gallery': "import GalleryPage from '../../../../pages/GalleryPage'; export default function Page() { return <GalleryPage />; }",
  '(main)/life/video': "import GalleryPage from '../../../../pages/GalleryPage'; export default function Page() { return <GalleryPage />; }",
  '(main)/life/news': "import BoardPage from '../../../../pages/BoardPage'; const nav = [{name:'사진갤러리',path:'/life/gallery'},{name:'영상갤러리',path:'/life/video'},{name:'보도자료',path:'/life/news'}]; export default function Page() { return <BoardPage mainCategory='학교생활' subCategory='보도자료' navItems={nav} />; }",
  '(main)/life/gallery/write': "import GalleryWritePage from '../../../../../pages/GalleryWritePage'; export default function Page() { return <GalleryWritePage />; }",

  '(main)/community/notice': "import BoardPage from '../../../../pages/BoardPage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page() { return <BoardPage mainCategory='커뮤니티' subCategory='공지사항' navItems={nav} />; }",
  '(main)/community/notice/write': "import BoardWritePage from '../../../../../pages/BoardWritePage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page() { return <BoardWritePage mainCategory='커뮤니티' subCategory='공지사항' navItems={nav} />; }",
  '(main)/community/notice/[id]': "import BoardDetailPage from '../../../../../../pages/BoardDetailPage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page({params}) { return <BoardDetailPage mainCategory='커뮤니티' subCategory='공지사항' navItems={nav} params={params} />; }",

  '(main)/community/letter': "import BoardPage from '../../../../pages/BoardPage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page() { return <BoardPage mainCategory='커뮤니티' subCategory='가정통신문' navItems={nav} />; }",
  '(main)/community/letter/write': "import BoardWritePage from '../../../../../pages/BoardWritePage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page() { return <BoardWritePage mainCategory='커뮤니티' subCategory='가정통신문' navItems={nav} />; }",
  '(main)/community/letter/[id]': "import BoardDetailPage from '../../../../../../pages/BoardDetailPage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page({params}) { return <BoardDetailPage mainCategory='커뮤니티' subCategory='가정통신문' navItems={nav} params={params} />; }",

  '(main)/community/download': "import BoardPage from '../../../../pages/BoardPage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page() { return <BoardPage mainCategory='커뮤니티' subCategory='서식다운로드' navItems={nav} />; }",
  '(main)/community/download/write': "import BoardWritePage from '../../../../../pages/BoardWritePage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page() { return <BoardWritePage mainCategory='커뮤니티' subCategory='서식다운로드' navItems={nav} />; }",
  '(main)/community/download/[id]': "import BoardDetailPage from '../../../../../../pages/BoardDetailPage'; const nav = [{name:'공지사항',path:'/community/notice'},{name:'가정통신문',path:'/community/letter'},{name:'서식다운로드',path:'/community/download'}]; export default function Page({params}) { return <BoardDetailPage mainCategory='커뮤니티' subCategory='서식다운로드' navItems={nav} params={params} />; }",

  '(main)/login': "import LoginPage from '../../../pages/LoginPage'; export default function Page() { return <LoginPage />; }",
  '(main)/register': "import RegisterPage from '../../../pages/RegisterPage'; export default function Page() { return <RegisterPage />; }",

  '(admin)': "import AdminDashboard from '../../pages/AdminDashboard'; export default function Page() { return <AdminDashboard />; }"
};

for (const [routePath, content] of Object.entries(routes)) {
  const fullPath = path.join('src', 'app', routePath);
  fs.mkdirSync(fullPath, { recursive: true });
  fs.writeFileSync(path.join(fullPath, 'page.jsx'), content);
}

// Now replace react-router-dom usage in src/pages files
const pagesDir = path.join('src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('react-router-dom')) {
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"]/g, (match, imports) => {
      let newImports = "'use client';\n";
      if (imports.includes('Link')) {
        newImports += "import Link from 'next/link';\n";
      }
      const hooks = [];
      if (imports.includes('useNavigate')) hooks.push('useRouter');
      if (imports.includes('useLocation')) hooks.push('usePathname');
      if (imports.includes('useParams')) hooks.push('useParams');
      if (hooks.length > 0) {
        newImports += `import { ${hooks.join(', ')} } from 'next/navigation';\n`;
      }
      return newImports.trim();
    });

    content = content.replace(/const\s+(\w+)\s*=\s*useNavigate\(\)/g, "const router = useRouter();\n  const $1 = (path) => router.push(path)");
    content = content.replace(/<Link\s+to=/g, "<Link href=");
  }
  
  fs.writeFileSync(filePath, content);
}

console.log('App router scaffolding and pages component migration complete!');
