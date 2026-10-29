import { FormEvent, useEffect, useState } from 'react'

type IconName =
  | 'search'
  | 'user'
  | 'heart'
  | 'bag'
  | 'menu'
  | 'chevron'
  | 'arrow'
  | 'shoe'
  | 'walk'
  | 'run'
  | 'golf'
  | 'kids'
  | 'sale'
  | 'sparkle'
  | 'close'
  | 'star'
  | 'thumb'

const iconPaths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" /></>,
  heart: <path d="M20.4 5.6a5.1 5.1 0 0 0-7.2 0L12 6.8l-1.2-1.2a5.1 5.1 0 1 0-7.2 7.2L12 21l8.4-8.2a5.1 5.1 0 0 0 0-7.2Z" />,
  bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
  shoe: <path d="M3 14.5c2.8.2 4.6-.9 5.5-4.5 1 2.4 2.8 3.8 5.5 4.2l6 1.2c.8.2 1.3.8 1.3 1.6v1.3H3v-3.8Z" />,
  walk: <><circle cx="13" cy="4.5" r="2" /><path d="m10 20 1.5-6-3-2.5L10 7h5l2 4h3M12 14l4 2 2 4M7 20l3-4" /></>,
  run: <><circle cx="14.5" cy="4" r="2" /><path d="m5 11 4-1 3-3 3 3 3 1M8 20l3-6 3 2 3 4M12 8l-1 6" /></>,
  golf: <><path d="M7 3v15M7 4l8 3-8 3" /><path d="M3 20h9M17 17a2 2 0 1 0 0 .1" /></>,
  kids: <><circle cx="12" cy="7" r="3" /><path d="M7 21v-4a5 5 0 0 1 10 0v4M4 9l3 3M20 9l-3 3" /></>,
  sale: <><path d="m4 12 8-8 8 8-8 8-8-8Z" /><path d="M9 9h.1M15 15h.1M15 9l-6 6" /></>,
  sparkle: <><path d="m12 2 1.3 5.7L19 9l-5.7 1.3L12 16l-1.3-5.7L5 9l5.7-1.3L12 2Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  star: <path d="m12 2.8 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1-6.2-4.5-4.4 6.3-.9L12 2.8Z" />,
  thumb: <><path d="M7 10v11H3V10h4Z" /><path d="M7 19c2 1.2 4.2 2 6.6 2h2.7c1.1 0 2-.8 2.2-1.9l1.3-6.6a2 2 0 0 0-2-2.4h-4.3l.7-3.5c.3-1.7-.8-3.3-2.5-3.6L7 10v9Z" /></>,
}

function Icon({ name, size = 22, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

const categoryItems: { label: string; icon: IconName; tone: string }[] = [
  { label: '신상품', icon: 'sparkle', tone: 'mint' },
  { label: '남성', icon: 'shoe', tone: 'blue' },
  { label: '여성', icon: 'walk', tone: 'pink' },
  { label: '키즈', icon: 'kids', tone: 'yellow' },
  { label: '워크', icon: 'run', tone: 'violet' },
  { label: '골프', icon: 'golf', tone: 'green' },
  { label: '아울렛', icon: 'sale', tone: 'red' },
]

const products = [
  { id: 1, name: '고 워크 아치핏 2.0', category: '여성 워킹화', price: '139,000', discount: '12%', image: 'https://images.unsplash.com/photo-1591175359422-f989eac13455?auto=format&fit=crop&w=720&q=85', badge: 'BEST' },
  { id: 2, name: '맥스 쿠셔닝 엘리트 2.0', category: '남성 러닝화', price: '159,000', discount: '10%', image: 'https://images.unsplash.com/photo-1746206673199-5b75dcec1018?auto=format&fit=crop&w=720&q=85', badge: 'NEW' },
  { id: 3, name: '딜라이트 4.0', category: '공용 스니커즈', price: '109,000', discount: '18%', image: 'https://images.unsplash.com/photo-1675762647949-1b25f669a687?auto=format&fit=crop&w=720&q=85', badge: '단독' },
  { id: 4, name: '울트라 플렉스 3.0', category: '여성 슬립온', price: '99,000', discount: '15%', image: 'https://images.unsplash.com/photo-1697086317645-11bd9e74e2cf?auto=format&fit=crop&w=720&q=85', badge: 'HOT' },
  { id: 5, name: '고 런 라이드 11', category: '남성 퍼포먼스', price: '149,000', discount: '20%', image: 'https://images.unsplash.com/photo-1624028409599-ba168bfd6586?auto=format&fit=crop&w=720&q=85', badge: 'SALE' },
]

const storyCards = [
  { eyebrow: 'WALKING', title: '매일의 걸음을 더 가볍게', copy: '오래 걸어도 편안한 워킹 컬렉션', image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1000&q=85' },
  { eyebrow: 'RUNNING', title: '달리는 순간에 집중하다', copy: '반응형 쿠셔닝으로 완성한 러닝', image: 'https://images.unsplash.com/photo-1759674861540-afed9f86f94a?auto=format&fit=crop&w=1000&q=85' },
]

const superDeals = [
  {
    name: '딜라이트 4.0',
    discount: '30%',
    price: '89,000원',
    image: 'https://images.unsplash.com/photo-1675762647949-1b25f669a687?auto=format&fit=crop&w=1200&q=90',
    alt: '오늘의 특가 화이트 스니커즈',
  },
  {
    name: '고 워크 플렉스',
    discount: '25%',
    price: '79,000원',
    image: 'https://images.unsplash.com/photo-1617152623457-4c9b639926d7?auto=format&fit=crop&w=1200&q=90',
    alt: '화이트 스니커즈를 신은 모습',
  },
  {
    name: '우노 스탠드 온 에어',
    discount: '35%',
    price: '96,000원',
    image: 'https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?auto=format&fit=crop&w=1200&q=90',
    alt: '블랙 앤 화이트 스니커즈',
  },
]

const customerReviews = [
  {
    id: 1,
    product: '고 워크 아치핏 2.0',
    model: '여성 워킹화 · 240',
    image: 'https://images.unsplash.com/photo-1785061384322-5caf1c66b707?auto=format&fit=crop&w=900&q=85',
    productImage: products[0].image,
    review: '하루 종일 걸어도 발바닥이 편안해요. 쿠션이 부드럽고 발을 안정적으로 잡아줘서 출퇴근할 때 매일 신고 있습니다.',
    options: ['사이즈 잘 맞아요', '발볼 적당해요'],
    user: 'walks**',
    date: '2026.10.26',
    helpful: 28,
  },
  {
    id: 2,
    product: '맥스 쿠셔닝 엘리트 2.0',
    model: '남성 러닝화 · 270',
    image: 'https://images.unsplash.com/photo-1787983617153-58f1b5459ac5?auto=format&fit=crop&w=900&q=85',
    productImage: products[1].image,
    review: '가볍고 반발력이 좋아 장거리 러닝 후에도 무릎 부담이 덜했어요. 사진보다 실물이 더 깔끔해서 만족합니다.',
    options: ['사이즈 잘 맞아요', '색상 같아요'],
    user: 'runner**',
    date: '2026.10.24',
    helpful: 19,
  },
  {
    id: 3,
    product: '울트라 플렉스 3.0',
    model: '여성 슬립온 · 235',
    image: 'https://images.unsplash.com/photo-1778170496545-1b1e18367efa?auto=format&fit=crop&w=900&q=85',
    productImage: products[3].image,
    review: '신고 벗기 편한데 발등을 잘 잡아줘요. 청바지나 운동복 어디에나 잘 어울리고 생각보다 훨씬 가볍습니다.',
    options: ['사이즈 잘 맞아요', '발볼 적당해요'],
    user: 'daily**',
    date: '2026.10.21',
    helpful: 34,
  },
]

type Page = 'home' | 'login' | 'signup' | 'products' | 'detail'

const megaCategories = [
  { title: '신발', items: ['워킹화', '러닝화', '슬립온', '스니커즈'] },
  { title: '남성', items: ['남성 신발', '남성 의류', '액세서리', '빅사이즈'] },
  { title: '여성', items: ['여성 신발', '여성 의류', '샌들', '와이드핏'] },
  { title: '키즈', items: ['토들러', '리틀키즈', '빅키즈', '라이트업'] },
  { title: '스포츠', items: ['워크', '러닝', '골프', '트레일'] },
  { title: '특별관', items: ['신상품', '베스트', '아울렛', '기획전'] },
]

const catalogProducts = [
  ...products,
  { id: 6, name: '고 워크 플렉스 슬립인스', category: '공용 워킹화', price: '119,000', discount: '15%', image: 'https://images.unsplash.com/photo-1617152623457-4c9b639926d7?auto=format&fit=crop&w=720&q=85', badge: 'BEST' },
  { id: 7, name: '우노 스탠드 온 에어', category: '여성 스니커즈', price: '139,000', discount: '22%', image: 'https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?auto=format&fit=crop&w=720&q=85', badge: 'HOT' },
  { id: 8, name: '아치핏 오라', category: '남성 캐주얼화', price: '129,000', discount: '10%', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=720&q=85', badge: 'NEW' },
  { id: 9, name: '맥스 쿠셔닝 프리미어', category: '여성 러닝화', price: '159,000', discount: '18%', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=720&q=85', badge: '추천' },
  { id: 10, name: '스케치 라이트 프로', category: '키즈 운동화', price: '79,000', discount: '20%', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=720&q=85', badge: 'KIDS' },
  { id: 11, name: '고 골프 엘리트 5', category: '공용 골프화', price: '169,000', discount: '12%', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=720&q=85', badge: 'GOLF' },
  { id: 12, name: '밥스 스쿼드 카오스', category: '여성 데일리화', price: '89,000', discount: '25%', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=85', badge: 'SALE' },
]

function pageFromPath(pathname: string): Page {
  if (pathname.includes('login')) return 'login'
  if (pathname.includes('signup')) return 'signup'
  if (pathname.includes('/product/')) return 'detail'
  if (pathname.includes('products')) return 'products'
  return 'home'
}

function LoginPage({ onSignup, onSubmit }: { onSignup: () => void; onSubmit: () => void }) {
  return (
    <section className="auth-page">
      <div className="auth-shell content-width">
        <div className="auth-visual login-visual">
          <img src="https://images.unsplash.com/photo-1638265499174-62c2cb29137a?auto=format&fit=crop&w=1200&q=90" alt="스니커즈를 착용한 모델" />
          <div className="auth-visual-copy">
            <span>ALL DAY COMFORT</span>
            <h2>편안함으로 이어지는<br />당신의 모든 순간</h2>
            <p>로그인하고 나만을 위한 스케쳐스 혜택을 만나보세요.</p>
          </div>
        </div>
        <div className="auth-panel">
          <div className="auth-title">
            <span>WELCOME BACK</span>
            <h1>스케쳐스 코리아 로그인</h1>
            <p>회원 전용 쿠폰과 맞춤 상품을 확인해 보세요.</p>
          </div>
          <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
            <label>아이디<input required autoComplete="username" placeholder="아이디를 입력해주세요." /></label>
            <label>비밀번호<input required type="password" autoComplete="current-password" placeholder="비밀번호를 입력해주세요." /></label>
            <div className="auth-options">
              <label className="check-row"><input type="checkbox" /> 로그인 상태 유지</label>
              <span><button type="button">아이디 찾기</button><i /><button type="button">비밀번호 찾기</button></span>
            </div>
            <button className="auth-primary" type="submit">로그인</button>
            <div className="auth-divider"><span>간편 로그인</span></div>
            <button className="kakao-button" type="button" onClick={onSubmit}><b>K</b> 카카오 계정으로 로그인</button>
          </form>
          <div className="auth-signup">
            <span>아직 스케쳐스 회원이 아니신가요?</span>
            <button onClick={onSignup}>회원가입하기 <Icon name="arrow" size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SignupPage({ onLogin, onSubmit }: { onLogin: () => void; onSubmit: () => void }) {
  return (
    <section className="signup-page">
      <div className="signup-intro content-width">
        <span className="eyebrow dark">JOIN SKECHERS</span>
        <h1>스케쳐스 코리아 회원가입</h1>
        <p>한 번의 가입으로 온·오프라인 멤버십 혜택을 모두 누려보세요.</p>
        <div className="signup-steps" aria-label="회원가입 진행 단계">
          <span className="active"><b>01</b> 정보 입력</span><i /><span><b>02</b> 본인 인증</span><i /><span><b>03</b> 가입 완료</span>
        </div>
      </div>
      <div className="signup-layout content-width">
        <aside className="signup-benefits">
          <span>NEW MEMBER BENEFIT</span>
          <h2>처음 만나는<br />편안한 혜택</h2>
          <div><b>01</b><p><strong>1만원 쿠폰팩</strong><small>가입 즉시 발급</small></p></div>
          <div><b>02</b><p><strong>구매 금액 3% 적립</strong><small>온·오프라인 통합 멤버십</small></p></div>
          <div><b>03</b><p><strong>생일 축하 쿠폰</strong><small>특별한 날을 위한 추가 혜택</small></p></div>
        </aside>
        <form className="signup-form" onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
          <div className="form-section-title"><h2>기본 정보</h2><span><b>*</b> 필수 입력 항목</span></div>
          <div className="signup-fields">
            <label><span>이름 <b>*</b></span><input required placeholder="이름을 입력해주세요." /></label>
            <label>
              <span>휴대폰 번호 <b>*</b></span>
              <div className="input-with-button"><input required inputMode="tel" placeholder="'-' 없이 입력해주세요." /><button type="button">본인인증</button></div>
            </label>
            <label>
              <span>아이디 <b>*</b></span>
              <div className="input-with-button"><input required placeholder="영문, 숫자 조합 6~16자" /><button type="button">중복확인</button></div>
            </label>
            <label><span>이메일 <b>*</b></span><input required type="email" placeholder="example@skechers.com" /></label>
            <label><span>비밀번호 <b>*</b></span><input required type="password" placeholder="영문, 숫자, 특수문자 조합 8~16자" /></label>
            <label><span>비밀번호 확인 <b>*</b></span><input required type="password" placeholder="비밀번호를 다시 입력해주세요." /></label>
          </div>
          <div className="terms-box">
            <label className="check-row all"><input required type="checkbox" /> 약관에 모두 동의합니다.</label>
            <div><label className="check-row"><input type="checkbox" /> [필수] 쇼핑몰 이용약관 동의</label><button type="button">보기</button></div>
            <div><label className="check-row"><input type="checkbox" /> [필수] 개인정보 수집 및 이용 동의</label><button type="button">보기</button></div>
            <div><label className="check-row"><input type="checkbox" /> [선택] 마케팅 정보 수신 동의</label><button type="button">보기</button></div>
          </div>
          <button className="auth-primary signup-submit" type="submit">회원가입 완료</button>
          <p className="already-member">이미 회원이신가요? <button type="button" onClick={onLogin}>로그인</button></p>
        </form>
      </div>
    </section>
  )
}

function ProductListPage({
  category,
  liked,
  onCategory,
  onLike,
  onProduct,
}: {
  category: string
  liked: number[]
  onCategory: (category: string) => void
  onLike: (id: number) => void
  onProduct: (product: (typeof catalogProducts)[number]) => void
}) {
  return (
    <section className="catalog-page">
      <div className="catalog-hero">
        <div className="content-width">
          <span>DISCOVER YOUR COMFORT</span>
          <h1>{category}</h1>
          <p>일상의 모든 움직임을 더 가볍게 만드는 스케쳐스 컬렉션</p>
        </div>
      </div>
      <div className="catalog-categories content-width">
        {['전체', '신상품', '남성', '여성', '키즈', '워크', '러닝', '골프', '아울렛'].map((item) => (
          <button className={category === item ? 'active' : ''} key={item} onClick={() => onCategory(item)}>{item}</button>
        ))}
      </div>
      <div className="catalog-content content-width">
        <aside className="filter-panel">
          <div className="filter-title"><strong>필터</strong><button>초기화</button></div>
          {[
            { title: '성별', items: ['남성', '여성', '공용', '키즈'] },
            { title: '카테고리', items: ['워킹화', '러닝화', '스니커즈', '슬립온'] },
            { title: '사이즈', items: ['220–235', '240–255', '260–275', '280 이상'] },
            { title: '혜택', items: ['신상품', '베스트', '할인상품'] },
          ].map((group) => (
            <div className="filter-group" key={group.title}>
              <strong>{group.title}</strong>
              {group.items.map((item) => <label className="check-row" key={item}><input type="checkbox" /> {item}</label>)}
            </div>
          ))}
        </aside>
        <div className="catalog-products">
          <div className="catalog-toolbar">
            <span>총 <b>{catalogProducts.length}</b>개의 상품</span>
            <select aria-label="상품 정렬"><option>추천순</option><option>신상품순</option><option>낮은 가격순</option><option>높은 가격순</option></select>
          </div>
          <div className="catalog-grid">
            {catalogProducts.map((product) => (
              <article className="product-card clickable-card" key={product.id} onClick={() => onProduct(product)}>
                <div className="product-image">
                  <span className="product-badge">{product.badge}</span>
                  <img src={product.image} alt={product.name} />
                  <button className={`like-button ${liked.includes(product.id) ? 'liked' : ''}`} aria-label={`${product.name} 찜하기`} onClick={(event) => { event.stopPropagation(); onLike(product.id) }}><Icon name="heart" size={20} filled={liked.includes(product.id)} /></button>
                </div>
                <div className="product-info">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="price"><strong>{product.discount}</strong><b>{product.price}원</b></div>
                  <small>무료배송 · 무료 사이즈 교환</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductDetailPage({
  product,
  liked,
  onLike,
  onAddCart,
  onBuy,
}: {
  product: (typeof catalogProducts)[number]
  liked: boolean
  onLike: () => void
  onAddCart: () => void
  onBuy: () => void
}) {
  const detailImages = [
    product.image,
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1597892657493-6847b9640bac?auto=format&fit=crop&w=1200&q=90',
  ]
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [optionMessage, setOptionMessage] = useState('')

  const requireSize = (action: () => void) => {
    if (!selectedSize) {
      setOptionMessage('구매하실 사이즈를 선택해주세요.')
      return
    }
    setOptionMessage('')
    action()
  }

  return (
    <section className="detail-page">
      <div className="detail-breadcrumb content-width">
        <span>HOME</span><Icon name="chevron" size={12} /><span>{product.category}</span><Icon name="chevron" size={12} /><b>{product.name}</b>
      </div>
      <div className="detail-main content-width">
        <div className="detail-gallery">
          <div className="detail-thumbs">
            {detailImages.map((image, index) => (
              <button className={activeImage === index ? 'active' : ''} key={image} aria-label={`${index + 1}번 상품 이미지`} onClick={() => setActiveImage(index)}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <div className="detail-main-image">
            <span>ONLINE ONLY</span>
            <img src={detailImages[activeImage]} alt={`${product.name} 상품 이미지 ${activeImage + 1}`} />
            <div className="detail-image-count">{String(activeImage + 1).padStart(2, '0')} / {String(detailImages.length).padStart(2, '0')}</div>
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-heading">
            <span>{product.category}</span>
            <div><h1>{product.name}</h1><button className={liked ? 'liked' : ''} aria-label="상품 찜하기" onClick={onLike}><Icon name="heart" size={22} filled={liked} /></button></div>
            <small>품번 : SP0MRCGX211</small>
            <button className="detail-rating"><span className="stars">{[0, 1, 2, 3, 4].map((star) => <Icon key={star} name="star" size={13} filled />)}</span><b>4.9</b><u>리뷰 328</u></button>
          </div>
          <div className="detail-price">
            <span><b>{product.discount}</b><strong>{product.price}원</strong></span>
            <del>169,000원</del>
          </div>
          <div className="detail-benefits">
            <div><span>회원 혜택</span><p><strong>신규 회원 1만원 쿠폰팩</strong><small>구매 금액의 3% 포인트 적립</small></p><Icon name="chevron" size={15} /></div>
            <div><span>배송 안내</span><p><strong>전 상품 무료배송</strong><small>평균 3–5일 이내 출고</small></p></div>
          </div>
          <div className="detail-option">
            <div className="option-label"><strong>색상</strong><span>오프화이트 / 네이비</span></div>
            <div className="color-options">
              <button className="active" aria-label="오프화이트 색상"><i className="ivory" /></button>
              <button aria-label="네이비 색상"><i className="navy" /></button>
              <button aria-label="그레이 색상"><i className="gray" /></button>
            </div>
          </div>
          <div className="detail-option">
            <div className="option-label"><strong>사이즈</strong><button>사이즈 가이드 <Icon name="chevron" size={13} /></button></div>
            <div className="size-options">
              {['250', '255', '260', '265', '270', '275', '280'].map((size) => (
                <button className={selectedSize === size ? 'active' : ''} key={size} onClick={() => { setSelectedSize(size); setOptionMessage('') }}>{size}</button>
              ))}
            </div>
            {optionMessage && <p className="option-message" role="alert">{optionMessage}</p>}
          </div>
          {selectedSize && (
            <div className="selected-product">
              <div><strong>{product.name}</strong><span>오프화이트 / {selectedSize}</span></div>
              <div className="quantity-control"><button aria-label="수량 줄이기" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><span>{quantity}</span><button aria-label="수량 늘리기" onClick={() => setQuantity((current) => current + 1)}>+</button></div>
            </div>
          )}
          <div className="detail-total"><span>총 상품금액</span><strong>{(Number(product.price.replace(',', '')) * quantity).toLocaleString()}원</strong></div>
          <div className="purchase-actions">
            <button className="cart-action" onClick={() => requireSize(onAddCart)}>장바구니</button>
            <button className="buy-action" onClick={() => requireSize(onBuy)}>바로 구매하기</button>
          </div>
          <div className="detail-assurance">
            <span><b>01</b> 무료 배송</span><span><b>02</b> 사이즈 교환 1회</span><span><b>03</b> 정품 보장</span>
          </div>
        </div>
      </div>
      <div className="detail-tabs">
        <div className="content-width"><a href="#product-story" className="active">상품정보</a><a href="#size-info">사이즈 안내</a><a href="#detail-reviews">상품리뷰 <b>328</b></a><a href="#shipping-info">배송/교환 안내</a></div>
      </div>
      <section className="detail-editorial content-width">
        <img src="https://images.unsplash.com/photo-1577804315087-dcda56501f1a?auto=format&fit=crop&w=1600&q=90" alt="블루 배경 위 스니커즈 스타일링" />
        <div>
          <span>THE COMFORT TECHNOLOGY</span>
          <h2>가볍게 신고,<br />더 멀리 움직이다</h2>
          <p>발을 넣는 순간부터 마지막 걸음까지 이어지는 스케쳐스만의 편안함.</p>
        </div>
        <small>01 / PERFORMANCE</small>
      </section>
      <section className="product-story content-width" id="product-story">
        <div className="story-copy">
          <span>MAX CUSHIONING®</span>
          <h2>한 걸음마다 느껴지는<br />압도적인 편안함</h2>
          <p>높고 부드러운 미드솔이 지면에서 전해지는 충격을 단계적으로 흡수합니다. 발의 아치를 안정적으로 지지하도록 설계해 긴 산책과 출퇴근, 가벼운 러닝까지 하루 종일 편안합니다.</p>
          <div><span><b>01</b> 가벼운 무게</span><span><b>02</b> 반응형 쿠셔닝</span><span><b>03</b> 안정적인 지지력</span></div>
        </div>
        <div className="story-product-image"><img src="https://images.unsplash.com/photo-1597892657493-6847b9640bac?auto=format&fit=crop&w=1200&q=90" alt="러닝화 착화 디테일" /></div>
      </section>
      <section className="technology-section content-width">
        <div className="detail-content-heading">
          <span>WHY YOU'LL LOVE IT</span>
          <h2>매일 신게 되는 세 가지 이유</h2>
          <p>움직임을 세심하게 연구해 완성한 스케쳐스의 핵심 기술을 경험해 보세요.</p>
        </div>
        <div className="technology-grid">
          <article>
            <div><img src="https://images.unsplash.com/photo-1676767720609-c76265fb3074?auto=format&fit=crop&w=900&q=90" alt="손에 든 러닝화" /><span>01</span></div>
            <small>HANDS FREE SLIP-INS®</small>
            <h3>손대지 않고 간편하게</h3>
            <p>뒤꿈치를 안정적으로 받쳐주는 힐 필로우 설계로 서 있는 그대로 빠르고 편안하게 신을 수 있습니다.</p>
          </article>
          <article>
            <div><img src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=90" alt="화이트 오렌지 러닝화" /><span>02</span></div>
            <small>ULTRA GO® CUSHIONING</small>
            <h3>가볍고 탄력 있는 쿠셔닝</h3>
            <p>초경량 폼이 착지 충격을 흡수하고 다음 걸음에 필요한 반발력을 더해 자연스러운 보행을 돕습니다.</p>
          </article>
          <article>
            <div><img src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=900&q=90" alt="블루 앤 화이트 러닝화" /><span>03</span></div>
            <small>AIR-COOLED MEMORY FOAM®</small>
            <h3>오래 지속되는 산뜻함</h3>
            <p>통기성이 뛰어난 인솔이 발 모양에 맞춰 부드럽게 밀착되어 장시간 착화에도 쾌적함을 유지합니다.</p>
          </article>
        </div>
      </section>
      <section className="detail-lookbook content-width">
        <div className="lookbook-large"><img src="https://images.unsplash.com/photo-1587587448924-b5a1db520d29?auto=format&fit=crop&w=1200&q=90" alt="블루 스니커즈 착화 모습" /></div>
        <div className="lookbook-copy">
          <span>DESIGNED FOR EVERYDAY</span>
          <h2>일상과 운동의 경계를<br />가볍게 넘나들다</h2>
          <p>미니멀한 실루엣과 유연한 소재로 데님, 조거 팬츠, 액티브웨어 어디에나 자연스럽게 어울립니다.</p>
          <div><strong>약 298g</strong><small>270 사이즈 한 쪽 기준</small></div>
        </div>
        <div className="lookbook-small"><img src="https://images.unsplash.com/photo-1639843093167-ed40b985c01e?auto=format&fit=crop&w=1000&q=90" alt="도심을 달리는 러너" /></div>
      </section>
      <section className="product-spec-section">
        <div className="content-width">
          <div className="detail-content-heading light">
            <span>PRODUCT SPECIFICATION</span>
            <h2>제품을 더 자세히 알아보세요</h2>
          </div>
          <div className="product-spec-grid">
            <div><span>UPPER</span><strong>엔지니어드 메시</strong><small>유연하고 뛰어난 통기성</small></div>
            <div><span>MIDSOLE</span><strong>ULTRA GO® 폼</strong><small>가볍고 반응성이 좋은 쿠셔닝</small></div>
            <div><span>INSOLE</span><strong>메모리 폼</strong><small>발 모양에 맞춘 부드러운 지지</small></div>
            <div><span>OUTSOLE</span><strong>듀얼 러버</strong><small>안정적인 접지와 내구성</small></div>
            <div><span>HEEL</span><strong>약 4.5cm</strong><small>자연스러운 키높이 효과</small></div>
            <div><span>CARE</span><strong>기계 세탁 가능</strong><small>찬물·약한 코스 사용 권장</small></div>
          </div>
        </div>
      </section>
      <section className="size-info content-width" id="size-info">
        <div><span>FIT GUIDE</span><h2>편안한 착화를 위한 사이즈 안내</h2><p>정사이즈로 출시된 제품입니다. 발볼이 넓거나 여유 있는 착화를 원한다면 반 사이즈 크게 선택해 주세요.</p></div>
        <div className="size-table">
          <span>KR</span>{['250', '255', '260', '265', '270', '275', '280'].map((size) => <b key={size}>{size}</b>)}
          <span>US</span>{['7', '7.5', '8', '8.5', '9', '9.5', '10'].map((size) => <b key={size}>{size}</b>)}
        </div>
      </section>
      <section className="detail-reviews content-width" id="detail-reviews">
        <div className="detail-section-heading"><div><span>REAL REVIEW</span><h2>상품리뷰 <b>328</b></h2></div><button>리뷰 전체보기 <Icon name="arrow" size={16} /></button></div>
        <div className="detail-review-summary">
          <div><strong>4.9</strong><span className="stars">{[0, 1, 2, 3, 4].map((star) => <Icon key={star} name="star" size={17} filled />)}</span><small>구매 고객 만족도</small></div>
          <div><strong>98%</strong><span>사이즈가 잘 맞아요</span></div>
          <div><strong>96%</strong><span>발볼이 편안해요</span></div>
          <div><strong>97%</strong><span>색상이 화면과 같아요</span></div>
        </div>
        <div className="detail-review-list">
          {customerReviews.slice(0, 2).map((review) => (
            <article key={review.id}>
              <img src={review.image} alt={`${product.name} 고객 착용 후기`} />
              <div>
                <span className="stars">{[0, 1, 2, 3, 4].map((star) => <Icon key={star} name="star" size={14} filled />)}</span>
                <h3>{review.review}</h3>
                <div className="review-options">{review.options.map((option) => <span key={option}>{option}</span>)}</div>
                <small>{review.user} · {review.date} · 구매 옵션 {review.model.split('·')[1]}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="shipping-info" id="shipping-info">
        <div className="content-width">
          <h2>배송/교환 안내</h2>
          <div><strong>배송 안내</strong><p>결제 완료 후 평균 3–5일 이내 배송됩니다. 스케쳐스 공식몰 회원은 전 상품 무료배송 혜택을 받을 수 있습니다.</p></div>
          <div><strong>교환 및 반품</strong><p>상품 수령 후 7일 이내 신청할 수 있으며, 사이즈 교환은 1회 무료로 제공됩니다.</p></div>
        </div>
      </section>
    </section>
  )
}

export default function App() {
  const [promoVisible, setPromoVisible] = useState(true)
  const [activeTab, setActiveTab] = useState('지금 인기')
  const [liked, setLiked] = useState<number[]>([])
  const [hero, setHero] = useState(0)
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [activeDeal, setActiveDeal] = useState(0)
  const [dealPaused, setDealPaused] = useState(false)
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([])
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname))
  const [selectedCategory, setSelectedCategory] = useState(() => new URLSearchParams(window.location.search).get('category') || '전체')
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const id = Number(new URLSearchParams(window.location.search).get('item'))
    return catalogProducts.find((product) => product.id === id) || catalogProducts[1]
  })
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (dealPaused) return

    const timer = window.setInterval(() => {
      setActiveDeal((current) => (current + 1) % superDeals.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [dealPaused])

  useEffect(() => {
    const handleHistory = () => {
      setPage(pageFromPath(window.location.pathname))
      setSelectedCategory(new URLSearchParams(window.location.search).get('category') || '전체')
      const id = Number(new URLSearchParams(window.location.search).get('item'))
      if (id) setSelectedProduct(catalogProducts.find((product) => product.id === id) || catalogProducts[1])
    }
    window.addEventListener('popstate', handleHistory)
    return () => window.removeEventListener('popstate', handleHistory)
  }, [])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const value = query.trim()
    if (!value) {
      setNotice('검색어를 입력해주세요.')
      window.setTimeout(() => setNotice(''), 2600)
      return
    }
    navigate('products', value)
  }

  const toggleLike = (id: number) => {
    setLiked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const toggleHelpful = (id: number) => {
    setHelpfulReviews((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const navigate = (nextPage: Page, category?: string) => {
    const paths: Record<Page, string> = { home: '/', login: '/login', signup: '/signup', products: '/products', detail: '/product/SP0MRCGX211' }
    const nextCategory = category || selectedCategory
    const url = nextPage === 'products' ? `${paths.products}?category=${encodeURIComponent(nextCategory)}` : paths[nextPage]
    window.history.pushState({}, '', url)
    setPage(nextPage)
    if (category) setSelectedCategory(category)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectCategory = (label: string) => {
    navigate('products', label)
  }

  const openProduct = (product: (typeof catalogProducts)[number] = catalogProducts[1]) => {
    setSelectedProduct(product)
    window.history.pushState({}, '', `/product/SP0MRCGX211?item=${product.id}`)
    setPage('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      {promoVisible && (
        <div className="promo-bar">
          <button className="promo-offer" onClick={() => navigate('login')}>
            <span>신규 회원 가입 시 1만원 쿠폰팩</span>
            <strong>지금 혜택 받기</strong>
          </button>
          <button className="promo-close" aria-label="프로모션 닫기" onClick={() => setPromoVisible(false)}><Icon name="close" size={16} /></button>
        </div>
      )}

      <header className="header">
        <div className="utility">
          <div className="utility-inner">
            <span>공식 온라인 스토어</span>
            <nav aria-label="유틸리티 메뉴">
              <button onClick={() => navigate('login')}>로그인</button><button onClick={() => navigate('signup')}>회원가입</button><button>고객센터</button>
            </nav>
          </div>
        </div>
        <div className="header-main">
          <a className="logo" href="/" aria-label="스케쳐스 홈" onClick={(event) => { event.preventDefault(); navigate('home') }}>SKECHERS</a>
          <form className="search" onSubmit={submitSearch}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="상품 검색" placeholder="어떤 상품을 찾고 계신가요?" />
            <button aria-label="검색"><Icon name="search" size={23} /></button>
          </form>
          <div className="quick-actions">
            <button aria-label="마이페이지"><Icon name="user" /><span>마이</span></button>
            <button aria-label="찜한 상품"><Icon name="heart" /><span>찜</span></button>
            <button aria-label="장바구니"><Icon name="bag" /><span>장바구니</span><b>{cartCount}</b></button>
          </div>
        </div>
        <div className="gnb-wrap">
          <nav className="gnb" aria-label="주요 메뉴">
            <button className="all-menu" onClick={() => selectCategory('전체')}><Icon name="menu" size={19} /> 전체 카테고리</button>
            {['신상품', '남성', '여성', '키즈', '워크', '러닝', '골프'].map((item) => <button key={item} onClick={() => selectCategory(item)}>{item}</button>)}
            <span className="gnb-divider" />
            <button className="accent" onClick={() => selectCategory('기획전')}>기획전</button><button className="sale" onClick={() => selectCategory('아울렛')}>아울렛</button>
          </nav>
          <div className="mega-menu">
            <div className="mega-menu-inner">
              {megaCategories.map((group) => (
                <div className="mega-column" key={group.title}>
                  <button className="mega-title" onClick={() => selectCategory(group.title)}>{group.title} <Icon name="chevron" size={14} /></button>
                  {group.items.map((item) => <button key={item} onClick={() => selectCategory(item)}>{item}</button>)}
                </div>
              ))}
              <button className="mega-promo" onClick={() => selectCategory('신상품')}>
                <span>NEW ARRIVAL</span>
                <strong>새로운 편안함을<br />가장 먼저 만나보세요</strong>
                <small>신상품 전체보기 <Icon name="arrow" size={15} /></small>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {page === 'login' ? (
          <LoginPage
            onSignup={() => navigate('signup')}
            onSubmit={() => {
              setNotice('데모 화면에서는 로그인 UI만 제공됩니다.')
              window.setTimeout(() => setNotice(''), 2400)
            }}
          />
        ) : page === 'signup' ? (
          <SignupPage
            onLogin={() => navigate('login')}
            onSubmit={() => {
              setNotice('회원가입 정보가 확인되었습니다.')
              window.setTimeout(() => setNotice(''), 2400)
            }}
          />
        ) : page === 'products' ? (
          <ProductListPage
            category={selectedCategory}
            liked={liked}
            onCategory={(category) => navigate('products', category)}
            onLike={toggleLike}
            onProduct={openProduct}
          />
        ) : page === 'detail' ? (
          <ProductDetailPage
            key={selectedProduct.id}
            product={selectedProduct}
            liked={liked.includes(selectedProduct.id)}
            onLike={() => toggleLike(selectedProduct.id)}
            onAddCart={() => {
              setCartCount((current) => current + 1)
              setNotice('선택한 상품을 장바구니에 담았습니다.')
              window.setTimeout(() => setNotice(''), 2400)
            }}
            onBuy={() => {
              setNotice('주문서 페이지로 이동할 준비가 완료되었습니다.')
              window.setTimeout(() => setNotice(''), 2400)
            }}
          />
        ) : (
          <>
        <section className="hero-section" aria-label="주요 프로모션">
          <div className="hero-copy">
            <span className="eyebrow">SKECHERS EXCLUSIVE</span>
            <h1>{hero === 0 ? <>편안함의 기준을<br />다시 쓰다</> : <>당신의 모든 걸음에<br />가벼움을</>}</h1>
            <p>{hero === 0 ? 'NEW 아치핏 2.0 컬렉션' : '데일리 워킹 컬렉션'}</p>
            <button className="hero-link" onClick={() => openProduct()}>컬렉션 보기 <Icon name="arrow" size={18} /></button>
          </div>
          <button className={`hero-visual hero-${hero}`} aria-label="프로모션 상품 상세보기" onClick={() => openProduct()}>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <img src={hero === 0 ? 'https://images.unsplash.com/photo-1746206673199-5b75dcec1018?auto=format&fit=crop&w=900&q=90' : 'https://images.unsplash.com/photo-1697086317645-11bd9e74e2cf?auto=format&fit=crop&w=900&q=90'} alt={hero === 0 ? '화이트 러닝화 컬렉션' : '브라운 워킹화를 신은 모습'} />
            <span className="hero-tag">MEMORY FOAM<br /><b>ALL DAY COMFORT</b></span>
          </button>
          <div className="hero-dots">
            {[0, 1].map((item) => <button key={item} aria-label={`${item + 1}번 배너`} className={hero === item ? 'active' : ''} onClick={() => setHero(item)} />)}
          </div>
          <button className="hero-next" aria-label="다음 배너" onClick={() => setHero(hero === 0 ? 1 : 0)}><Icon name="chevron" /></button>
        </section>

        <section className="category-section content-width">
          <div className="section-heading compact">
            <div><span className="eyebrow dark">QUICK CATEGORY</span><h2>무엇을 찾으세요?</h2></div>
          </div>
          <div className="category-grid">
            {categoryItems.map((item) => (
              <button key={item.label} onClick={() => selectCategory(item.label)}>
                <span className={`category-icon ${item.tone}`}><Icon name={item.icon} size={29} /></span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="product-section">
          <div className="content-width">
            <div className="section-heading">
              <div><span className="eyebrow dark">TREND NOW</span><h2>요즘 가장 많이 찾는 아이템</h2></div>
              <button className="view-all">전체보기 <Icon name="arrow" size={17} /></button>
            </div>
            <div className="tabs" role="tablist">
              {['지금 인기', '워크 베스트', '러닝 추천', '신상품'].map((tab) => (
                <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card clickable-card" key={product.id} onClick={() => openProduct(product)}>
                  <div className="product-image">
                    <span className="product-badge">{product.badge}</span>
                    <img src={product.image} alt={product.name} />
                    <button className={`like-button ${liked.includes(product.id) ? 'liked' : ''}`} aria-label={`${product.name} 찜하기`} onClick={(event) => { event.stopPropagation(); toggleLike(product.id) }}><Icon name="heart" size={20} filled={liked.includes(product.id)} /></button>
                    {index < 3 && <span className="rank">{index + 1}</span>}
                  </div>
                  <div className="product-info">
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="price"><strong>{product.discount}</strong><b>{product.price}원</b></div>
                    <small>무료배송 · 리뷰 {124 + index * 93}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="deal-section content-width"
          aria-roledescription="carousel"
          aria-label="오늘의 슈퍼딜"
          onMouseEnter={() => setDealPaused(true)}
          onMouseLeave={() => setDealPaused(false)}
          onFocusCapture={() => setDealPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setDealPaused(false)
          }}
        >
          <div className="deal-lead">
            <span className="eyebrow">TODAY ONLY</span>
            <h2>오늘의 슈퍼딜</h2>
            <p>매일 오전 10시,<br />새로운 혜택을 만나보세요.</p>
            <div className="timer"><span>08</span><i>:</i><span>42</span><i>:</i><span>19</span></div>
            <button className="deal-more" onClick={() => openProduct(catalogProducts[2])}>특가 전체보기 <Icon name="arrow" size={17} /></button>
            <div className="deal-navigation">
              <span><b>{String(activeDeal + 1).padStart(2, '0')}</b> / {String(superDeals.length).padStart(2, '0')}</span>
              <div>
                <button
                  className="deal-prev"
                  aria-label="이전 슈퍼딜"
                  onClick={() => setActiveDeal((current) => (current - 1 + superDeals.length) % superDeals.length)}
                >
                  <Icon name="chevron" size={18} />
                </button>
                <button
                  aria-label="다음 슈퍼딜"
                  onClick={() => setActiveDeal((current) => (current + 1) % superDeals.length)}
                >
                  <Icon name="chevron" size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="deal-carousel">
            <div className="deal-track" style={{ transform: `translateX(-${activeDeal * 100}%)` }}>
              {superDeals.map((deal, index) => (
                <article
                  className="deal-slide"
                  key={deal.name}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${superDeals.length}`}
                  aria-hidden={activeDeal !== index}
                  onClick={() => openProduct(catalogProducts[index + 2])}
                >
                  <img src={deal.image} alt={deal.alt} />
                  <div className="deal-floating">
                    <small>오늘만 이 가격</small>
                    <strong>{deal.name}</strong>
                    <span><b>{deal.discount}</b> {deal.price}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="deal-dots" aria-label="슈퍼딜 배너 선택">
              {superDeals.map((deal, index) => (
                <button
                  key={deal.name}
                  className={activeDeal === index ? 'active' : ''}
                  aria-label={`${index + 1}번 슈퍼딜 보기`}
                  aria-current={activeDeal === index}
                  onClick={() => setActiveDeal(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="stories content-width">
          <div className="section-heading">
            <div><span className="eyebrow dark">SHOP BY STORY</span><h2>당신의 라이프스타일을 위한 선택</h2></div>
          </div>
          <div className="story-grid">
            {storyCards.map((story) => (
              <article className="story-card clickable-card" key={story.eyebrow} onClick={() => openProduct(catalogProducts[story.eyebrow === 'WALKING' ? 0 : 4])}>
                <img src={story.image} alt="" />
                <div className="story-overlay">
                  <span>{story.eyebrow}</span><h3>{story.title}</h3><p>{story.copy}</p>
                  <button aria-label={`${story.title} 보기`}><Icon name="arrow" size={19} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews-section">
          <div className="content-width">
            <div className="review-heading">
              <div>
                <span className="eyebrow dark">REAL REVIEW</span>
                <h2>고객이 직접 전하는 편안함</h2>
                <p>스케쳐스를 먼저 경험한 고객들의 생생한 후기를 확인해 보세요.</p>
              </div>
              <div className="review-score" aria-label="고객 리뷰 평점 5점 만점에 4.9점">
                <strong>4.9</strong>
                <span>
                  <span className="stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((star) => <Icon key={star} name="star" size={14} filled />)}
                  </span>
                  <small>전체 리뷰 12,842개</small>
                </span>
              </div>
            </div>
            <div className="review-grid">
              {customerReviews.map((review) => {
                const isHelpful = helpfulReviews.includes(review.id)
                return (
                  <article className="review-card" key={review.id}>
                    <div className="review-photo">
                      <img src={review.image} alt={`${review.product} 착용 고객 리뷰`} />
                      <span>PHOTO REVIEW</span>
                    </div>
                    <div className="review-body">
                      <div className="review-product">
                        <img src={review.productImage} alt="" />
                        <div><strong>{review.product}</strong><small>{review.model}</small></div>
                        <Icon name="chevron" size={17} />
                      </div>
                      <div className="review-rating">
                        <span className="stars" aria-label="5점 만점에 5점">
                          {[0, 1, 2, 3, 4].map((star) => <Icon key={star} name="star" size={13} filled />)}
                        </span>
                        <b>5.0</b>
                      </div>
                      <p className="review-copy">{review.review}</p>
                      <div className="review-options">
                        {review.options.map((option) => <span key={option}>{option}</span>)}
                      </div>
                      <div className="review-meta">
                        <span>{review.user} · {review.date}</span>
                        <button
                          className={isHelpful ? 'active' : ''}
                          aria-pressed={isHelpful}
                          aria-label={`${review.product} 리뷰 추천`}
                          onClick={() => toggleHelpful(review.id)}
                        >
                          <Icon name="thumb" size={15} /> 도움돼요 {review.helpful + (isHelpful ? 1 : 0)}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
            <button className="review-all" onClick={() => setNotice('전체 고객 리뷰 페이지를 준비하고 있어요.')}>
              고객 리뷰 전체보기 <Icon name="arrow" size={17} />
            </button>
          </div>
        </section>

        <section className="benefits">
          <div className="content-width benefit-grid">
            <div><b>01</b><span><strong>무료 배송</strong><small>5만원 이상 구매 시</small></span></div>
            <div><b>02</b><span><strong>무료 교환</strong><small>사이즈 교환 1회</small></span></div>
            <div><b>03</b><span><strong>멤버십 혜택</strong><small>구매 금액 3% 적립</small></span></div>
            <div><b>04</b><span><strong>정품 보장</strong><small>공식 온라인 스토어</small></span></div>
          </div>
        </section>
          </>
        )}
      </main>

      <footer>
        <div className="content-width footer-top">
          <a className="logo footer-logo" href="/" onClick={(event) => { event.preventDefault(); navigate('home') }}>SKECHERS</a>
          <div><strong>고객센터 1899-5214</strong><span>평일 09:00–18:00 · 주말/공휴일 휴무</span></div>
          <nav><button>회사소개</button><button>이용약관</button><button>개인정보처리방침</button></nav>
        </div>
      </footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}
