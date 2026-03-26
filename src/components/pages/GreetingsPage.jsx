import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'

const GreetingsPage = () => {
  const navItems = [
    { name: '?몄궗留?, path: '/about/greetings' },
    { name: '援먯쑁紐⑺몴', path: '/about/goals' },
    { name: '?숆탳?고쁺', path: '/about/history' },
    { name: '?ㅼ떆??湲?, path: '/about/map' },
  ]

  return (
    <SubPageLayout 
      mainCategory="?숆탳?뚭컻" 
      subCategory="?몄궗留? 
      navItems={navItems}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Greetings</h2>
          <h3 className="text-4xl font-bold text-gray-800">諛곗???利먭쾪怨??깆옣??湲곗걶 ?숆탳</h3>
          <div className="w-16 h-1 bg-secondary mx-auto mt-6" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
              <img 
                src="/principal.png" 
                alt="Principal" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-2/3 space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              ?덈뀞?섏떗?덇퉴? TJSCHOOL ?덊럹?댁?瑜?李얠븘二쇱떊 ?щ윭遺꾩쓣 吏꾩떖?쇰줈 ?섏쁺?⑸땲??
            </p>
            <p>
              ?곕━ ?숆탳??湲곕룆援??뺤떊??諛뷀깢?쇰줈, ?숈깮?ㅼ씠 ?섎굹?섏쓣 寃쎌쇅?섍퀬 ?댁썐???щ옉?섎뒗 湲濡쒕쾶 由щ뜑濡??깆옣?????덈룄濡??뺣뒗 援먯쑁 怨듬룞泥댁엯?덈떎. 
              ?ㅻ뒛?좎쓽 湲됰??섎뒗 ?ы쉶 ?띿뿉???곕━ ?꾩씠?ㅼ뿉寃?媛???꾩슂??寃껋? ?⑥닚??吏?앹쓽 ?듬뱷蹂대떎???ㅼ뒪濡??앷컖?섍퀬 臾몄젣瑜??닿껐???섍???'李쎌쓽???좎옱??怨???멸낵 ?뚰넻?섎ŉ ?묐젰?섎뒗 '?곕쑜???몄꽦'?낅땲??
            </p>
            <p>
              TJSCHOOL??紐⑤뱺 援먯쭅?먯? ?꾩씠?ㅼ씠 ?먯떊???뚯쨷??媛移섎? 源⑤떕怨? 諛곗???利먭굅? ?띿뿉???먯떊??轅덉쓣 留덉쓬猿??쇱튌 ???덈뒗 ?덉쟾?섍퀬 ?됰났???곗쟾???섎룄濡?理쒖꽑???ㅽ븯怨??덉뒿?덈떎.
            </p>
            <p className="font-bold text-gray-800 pt-10">
              TJSCHOOL 援먯옣 <span className="text-2xl ml-4 font-serif italic text-primary">??湲???/span>
            </p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default GreetingsPage

