import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import "../ground/css/reset.css";
import "../ground/css/style.css";
import { resultMap } from './DataRegistPage';

const DataPrintPage = ({ match }) => {
  const location = useLocation();
  const { state } = location;
  if(!state) return <Redirect to="/ground"/>

  const { user, rank } = state; 

  return (
    <>
      <div className="print-page">
        <div className="healine">
          <div className="head">
            <p>한국정상에서 세계정상으로 글로벌 No. 1 </p>
          </div>
          <p className="txt-headline">
            옥타그노시스
            진로적성검사
            결과분석지
          </p>
          <ul>
            <li>104,060상의 임상데이터를 기반으로 본인의 성향과 선호도에 맞게 도출된 객관적 검사결과입니다.</li>
            <li>15가지 성향유형 중에서 총점이 가장 높은 성향유형 3가지가 자신의 최종 성향입니다.</li>
            <li>
              만약 2가지 혹은 3가지의 성향유형이 똑같은 점수로 가장 높게 나왔다면, 모두 자신의 최종성향이 됩니다.
              <p className="txt-example">예: 운동형 60점, 소통형 60점, 봉사형 45점, 교육형 32점이라면, 1순위 성향유형 (운동형, 소통형) 2순위 성향유형 (봉사형)</p>
            </li>
          </ul>
        </div>
        <div className="content">
          <p className="name"><strong>{user && user.userName}</strong>님</p>
          <ul>
            {Object.keys(rank).map(key => { 
              const grade = parseInt(key) + 1;
              const ranks = rank[key];
              return (
                <li key={grade}>
                  <p className="tit">{`# ${grade}성향`}</p>
                  <ul>
                  {ranks.map(rank => {
                    const { resultIdx } = rank;
                    return (
                      <li key={resultIdx}>{resultMap[resultIdx].title}</li>
                    )
                  })}
                  </ul>
                </li>
              )}
            )}
          </ul>
        </div>
        <div className="print-foot">
          <div className="inner">
            <div className="left">
              <h1 className="logo">한국진로적성센터</h1>
              <p className="txt-info">국내최초로 진로적성교육을 시작한 유일한 전문기관</p>
              <p className="txt-phone">02-523-7523 / 02-556-7959</p>
            </div>
            <div className="right">
              <div className="img-wrap">
                <img src="/public/static/img/img_footer.png" alt="" />
                <img src="/public/static/img/img_qr.png" alt="" />
              </div>
              <p className="txt-link">www.aptitude-x.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DataPrintPage