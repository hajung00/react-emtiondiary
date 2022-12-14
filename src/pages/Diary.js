import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Mybutton from '../coponents/Mybutton';
import Myheader from '../coponents/Myheader';
import { DiaryStateContext } from './../App';
import { getStringDate, emotionList } from './../util/date';

function Diary() {
  const { id } = useParams();
  const nagative = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetDiary = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        nagative('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className='DiaryPage'>로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (item) => parseInt(item.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);
    return (
      <div className='DiaryPage'>
        <Myheader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <Mybutton text={'< 뒤로가기'} onClick={() => nagative(-1)} />
          }
          rightChild={
            <Mybutton
              text={'수정하기'}
              onClick={() => nagative(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                'diary_img_wrapper ',
                `diary_img_wrapper_${data.emotion}`,
              ].join('')}
            >
              <img src={curEmotionData.emotion_img} />
              <div className='emotion_descript'>
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className='diary_content-wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
