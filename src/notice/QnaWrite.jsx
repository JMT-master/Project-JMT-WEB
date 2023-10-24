import React from 'react'
import style from '../css/KnowledgeWrite.css'
import { VscSearch } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import { call } from '../common/ApiService';
import { useState } from 'react';

const QnaWrite = (props) => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("관광지");
    const [index, setIndex] = useState(localStorage.getItem('qna.length') || 0);
    const [item, setItem] = useState({
        qnaCategory : category,
        qnaTitle : "",
        qnaContent : "",
        qnaView :  0,
        qnaNum : 0,
    });
    const navigate = useNavigate();


    const addItem = (item) => {
        console.log("add item : {}", item);
        call("/qna/admin/write","POST", item)
            .then((response) => setItems(response.data))
            .then(()=> navigate("/qna"));
      }

      const getEditItem = (item) => {
        call("/qna/admin/"+item.id, "GET", item)
            .then((response) => setItems(response.data));
      }

      const postEditItem = (item) => {
        const updatedItem = {
            qnaCategory: category,
            qnaTitle: document.getElementById('qna_title').value,
            qnaContent: document.getElementById('qna_content').value,
            qnaView: 0,
            qnaColNum: document.getElementById("qnaNum").value
        };
        call("/qna/admin/" + item.id, "POST", updatedItem) // Assuming PUT method for update operation
            .then(() => navigate("/qna"));
    };

    const onButtonClick = () => {
        if (item.id) {
            postEditItem(item);
        } else {
            const newItem = {
                qnaCategory: category,
                qnaTitle: document.getElementById('qna_title').value,
                qnaContent: document.getElementById('qna_content').value,
                qnaView: 0,
                qnaColNum: document.getElementById("qnaNum").value
            };
            addItem(newItem);
        }
    };

    const cateSelect = (e) => {
        setCategory(e.target.value);
    }

    return (
            <div className='knowledge-content'>
                <div className='knowledge-write-title'>
                    <h1>Q & A</h1>
                    <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span>
                    <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span>
                    <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span>
                    <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span>
                </div>
                <div className='ask'>
                    <h3>Q & A 작성</h3>
                </div>
                <div className='ask-box'>
                    <div className='ask-category'>
                        <h3>카테고리 선택</h3>
                        <p>분야를 선택해주세요</p>
                        <select className='category' id='category' name='category' onChange={cateSelect}>
                            <option value={"관광지"} selected>관광지</option>
                            <option value={"음식"}>음식</option>
                            <option value={"축제"}>축제</option>
                            <option value={"여행일정"}>여행일정</option>
                            <option value={"로그인"}>로그인</option>
                            <option value={"기타"}>기타</option>
                        </select>
                        <input type="hidden" id="qna_category" name="qna_category" />
                    </div>
                    <div className='ask-textarea'>
                        <h4>제목 작성</h4>
                        <input type="text" placeholder='제목을 작성해주세요' id="qna_title" name="qna_title" />
                        <textarea cols="80" rows="10" id="qna_content" name="qna_content"></textarea>
                    </div>
                    {/* <div className='file-attach'>
                        <label htmlFor='file'>
                            <div className='btn-upload'>파일 업로드 하기</div>
                        </label>
                        <input type="file" name='qna_file' id='qna_file' multiple/>
                    </div> */}
                </div>
                <div className='button-box'>
                    <button type="button" className='submit-knowledge' onClick={onButtonClick}>작성완료</button> 
                    <button type="button" className='submit-knowledge' onClick={onButtonClick}>수정완료</button>
                    <button className='back-to-knlist'onClick={() => navigate("/qna")}>목록으로 돌아가기</button>
                </div>
                <input type="hidden" id='qnaNum' name='qnaNum' value={index} />
            </div>
    )
}
export default QnaWrite
