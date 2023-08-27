import './css/App.scss';
import $ from 'jquery';
import Slider from 'react-slick';
import { Route, Routes, Link } from 'react-router-dom';
import JoinUser from './member/JoinUser';
import Curator from './thema/Curator';
import Mypage from './member/Mypage';
import TravelSchedule from './travelschedule/TravelSchedule';
import Login from './member/Login';
import NoticeBoard from './notice/NoticeBoard';
import NoticeBoardDetail from './notice/NoticeBoardDetail';
import { useState } from 'react';
import { knowledgeData, noticeData, qnaData } from './data/Data';
import QnABoard from './notice/QnABoard';
import QnaBoardDetail from './notice/QnaBoardDetail';
import Festival from './trableinfo/Festival';
import Knowledge from './trableinfo/Knowledge';
import KnowledgeDetail from './trableinfo/KnowledgeDetail';
import KnowledgeWrite from './trableinfo/KnowledgeWrite';
import TourList from './destination/TourList';
import DetailInfo from './destination/DetailInfo';
import Traffic from './trableinfo/Traffic';
import SelectSchedule from './travelschedule/SelectSchedule';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './common/Themes';
import { GlobalStyles } from './common/GlobalStyles';
import { useDarkMode } from './common/useDarkMode';
import Toggle from './common/Toggle';
function App() {
  const [newNoticedata, setNewNoticeData] = useState(noticeData);
  const [newQnaData, setNewQnaData] = useState(qnaData);
  const [newKnowledgeData, setNewKnowledgeData] = useState(knowledgeData);
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <HeaderTop theme={theme} themeToggler={themeToggler}/>
      <Routes>
        <Route path='/' element={<Header></Header>}></Route>
        <Route path="/joinUser" element={<JoinUser></JoinUser>}></Route>
        <Route path="/curator" element={<Curator></Curator>}></Route>
        <Route path="/travelSchedule" element={<TravelSchedule></TravelSchedule>}></Route>
        <Route path="/mypage" element={<Mypage></Mypage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/noticeBoard" element={<NoticeBoard></NoticeBoard>}></Route>
        <Route path="/noticeBoard/:id?" element={<NoticeBoardDetail data={newNoticedata}></NoticeBoardDetail>}></Route>
        <Route path="/qnABoard" element={<QnABoard></QnABoard>}></Route>
        <Route path="/qnABoard/:id?" element={<QnaBoardDetail data={newQnaData}></QnaBoardDetail>}></Route>
        <Route path="/festival?" element={<Festival></Festival>}></Route>
        <Route path="/traffic" element={<Traffic></Traffic>}></Route>
        <Route path="/knowledge?" element={<Knowledge></Knowledge>}></Route>
        <Route path="/knowledgeDetail/:id?" element={<KnowledgeDetail data={newKnowledgeData}></KnowledgeDetail>}></Route>
        <Route path="/knowledgeWrite" element={<KnowledgeWrite></KnowledgeWrite>}></Route>
        <Route path='/destination/:pageId' element={<TourList />}></Route>
        <Route path='/destination/detail/:id' element={<DetailInfo />}></Route>
        <Route path='/selectSchedule' element={<SelectSchedule></SelectSchedule>}></Route>
      </Routes>
    </ThemeProvider>
  );
}

function HeaderTop(props) {
  const handleMouseOver = () => {
    $(".destination-list").show();
    $(".myTrableInfo-list").show();
    $(".notice-list").show();

  };

  const handleMouseOut = () => {
    $(".destination-list").hide();
    $(".myTrableInfo-list").hide();
    $(".notice-list").hide();
  };

  return (
    <div class="header-main-position">
      <div class="headerTop">
        <Link to="/mypage" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>마이페이지</Link>
        <Link to="/login" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>로그인</Link>
        <Toggle theme={props.theme} toggleTheme={props.themeToggler}/>
      </div>
      <div class="header-container">
        <Link to="/"><a class="header-image" href=""><img id="jeju-image" src="../images/JMT.jpg" alt="" /></a></Link>
        <div class="headerSell">
          <ul id="destination" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <a className={`${props.theme === 'light'? 'blackText' : 'whiteText'}`}>여행지</a>
            <div className='destination-list'>
              <li><Link to='/destination/tour' className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>관광지</Link></li>
              <li><Link to='/destination/restaurant' className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>음식</Link></li>
              <li><Link to='/destination/lodge' className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>숙박</Link></li>
            </div>
          </ul>
          <ul id="tema">
            <div>
              <a><Link to="/curator" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>테마</Link></a>
            </div>
          </ul>
          <ul id="myTrab">
            <div>
              <a><Link to="/selectSchedule" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>여행일정</Link></a>
            </div>
          </ul>
          <ul id="myTrableInfo" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <a className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>여행정보</a>
            <div className='myTrableInfo-list'>
              <li><Link to="/traffic" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>교통 혼잡도</Link></li>
              <li><Link to="/festival" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>축제 및 행사</Link></li>
              <li><Link to="/knowledge" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>관광 지식in</Link></li>
            </div>
          </ul>
          <ul id="notice" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <a className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>공지사항</a>
            <div className='notice-list'>
              <li><Link to="/noticeBoard" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>공지사항</Link></li>
              <li><Link to="/qnABoard" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>Q&A</Link></li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Header() {

  // const handleMouseOver = () => {
  //   $(".destination-list").show();
  //   $(".myTrableInfo-list").show();
  //   $(".notice-list").show();

  // };

  // const handleMouseOut = () => {
  //   $(".destination-list").hide();
  //   $(".myTrableInfo-list").hide();
  //   $(".notice-list").hide();
  // };

  const settings = {
    dots: false, //지정콘텐츠로 이동하는 버튼 true / false
    infinite: true, //콘텐츠의 끝까지 갔을때 처음 콘텐츠로 돌아와서 반복
    speed: 1000, // 콘텐츠 넘어가는 속도
    autoplay: true,
    fade: true, //사라지는 애니메이션 없으면 slide애니메이션
    autoplaySpeed: 5000,
    slidesToShow: 1, //한 화면에 보이는 콘텐츠 개수
    slidesToScroll: 1 //한번에 넘어가는 콘텐츠 수 ex)2로 지정시 2개씩 넘어감
  };

  return (
    <>
      <div className='header-slider'>

        <Slider {...settings} className='header-slider-divs'>
          <div className='header-slider-img1'></div>
          <div className='header-slider-img2'></div>
          <div className='header-slider-img3'></div>
          <div className='header-slider-img4'></div>
        </Slider>
      </div>
    </>
  );
}

function Footer() {

  return (
    <>
      <div className='footer-main'>
        <div className='footer-container'>
          <a href=""><img id="jeju-image" src="../images/JMT.jpg" alt="" /></a>
          <ul className='footer-Grid1'>
            <li>개인정보 처리방침</li>
            <li>이용약관</li>
            <li>틀린정보신고</li>
            <li>제주관광사진이용</li>
            <li>제주소식</li>
            <div className='footer-Grid2'>
              <p>(63122) 제주특별자치도 제주시 선덕로 23(연동) 제주웰컴센터
                관광문의 : 제주관광공사Tel : 064-740-6000~1FAX : 064-740-6090사업자등록번호 : 616-82-21432
                관광불편신고 : 제주안내 120콜센터(국번없이 120번)
                Copyright©Jeju Tourism Organization, All rights reserved.

                홈페이지에 게시된 이메일 주소가 자동수집되는 것을 거부하며, 위반시 정보통신망법에 의해 처벌될 수 있습니다.
              </p>
            </div>
          </ul>
        </div>
      </div>
    </>
  )
}

export { HeaderTop, Footer };
export default App;

