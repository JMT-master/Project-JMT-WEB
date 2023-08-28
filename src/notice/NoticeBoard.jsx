import React, { useState } from 'react';
import style from '../css/NoticeBoard.css'
import { VscSearch } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { noticeData } from '../data/Data';
import Paging from '../common/Paging';

const TestTr = (props) => {
  const navigate = useNavigate();
  const {no, category, title, content, createDate} = props.data;
  
  return (
    <tr onClick={()=>navigate('/noticeBoard/'+no)}>
      <td>{no}</td>
      <td>{category}</td>
      <td>{title}</td>
      <td>{createDate}</td>
    </tr>
  );
};

const NoticeBoard = () => {
  const navigate = useNavigate();
  const [newNoticedata, setNewNoticeData] = useState(noticeData);
  const [currentPage , setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = noticeData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(noticeData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelect = (e) =>{
    setItemsPerPage(e.target.value);
  }


  return (
    <div className='content'>
      <h1><img src="../images/notice-icon.png" alt="공지사항 이미지" /></h1>
      <div className='searchNotice-box'>
        <h2>공지사항
        </h2>
           <div className='searchNotice'>
             <input type="text" placeholder='검색어를 입력하세요' />
          <button><VscSearch /></button>
           </div>
      </div>
      <br />
      <div className='notice-table'>
        <div className='page-choice'>
          <select onChange={handleSelect}>
            <option value={5}>5개씩</option>
            <option value={10} selected>10개씩</option>
            <option value={15}>15개씩</option>
            <option value={20}>20개씩</option>
          </select>
        </div>
        <table cl>
          <thead>
            <tr>
              <th>No.</th>
              <th>구분</th>
              <th>제목</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody className='cursor'>
            {currentItems.map((item, index)=>{
              return (
                <TestTr data={item} key={item.id}></TestTr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='page'>
      <Paging
        totalPages={totalPages} currentPage={currentPage}
        onPageChange={handlePageChange}></Paging>
      </div>
    </div>
  );
};

export default NoticeBoard;