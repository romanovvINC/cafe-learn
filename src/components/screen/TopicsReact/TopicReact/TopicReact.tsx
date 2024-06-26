import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import cn from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TopicReact.module.scss';
import { useTopicReact } from './useTopicReact';
import { MyToast } from '../../../ui/MyToast/MyToast';
import { useActions } from '../../../../hooks/useActions';
import {useAuth} from "../../../../hooks/useAuth";

const TopicReact = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { createCurrentTest, cleanCurrentQuestion } = useActions();
  const {
    allTopics, currentTopic, isLoadingAllTopics, isLoadingCurrentTopic,
  } = useTopicReact(id || '');
  let imgUrl;
  let videoUrl;
  const { user } = useAuth();

  useEffect(() => {
    setIsAnimation(true);
  }, [id]);

  if (currentTopic) {
    console.log(currentTopic)
    try {
      imgUrl = require(`../../../../assets/img/${currentTopic.pictureTopicUrl}`);
      videoUrl = require(`../../../../assets/videos/${currentTopic.videoUrl}`);
    } catch (error) {
      MyToast('Не удалось загрузить лекцию', false);
    }
  }

  const indexCurrentTopic = allTopics?.sort((a, b) => a.numberTopic - b.numberTopic).findIndex((topic) => topic.id === currentTopic?.id);

  const handleClickTestBtn = () => {
    if (currentTopic && allTopics && indexCurrentTopic !== undefined && indexCurrentTopic !== -1) {
      cleanCurrentQuestion();
      let nextTopicId;
      if (allTopics[indexCurrentTopic + 1].role === user?.role) {
        nextTopicId = allTopics[indexCurrentTopic + 1].id;
      } else {
        nextTopicId = 'lastTopic';
      }
      console.log(allTopics);
      console.log(allTopics.sort((a, b) => a.numberTopic - b.numberTopic));
      console.log(indexCurrentTopic);
      console.log(nextTopicId);
      createCurrentTest({
        id: currentTopic.relatedQuestionsId, currentTopicTitle: currentTopic.titleTopic, idTest: currentTopic.relatedQuestionsId, nextTopicId,
      });
      setIsPlaying(false);
      navigate(`/topics/test/${currentTopic.relatedQuestionsId}`);
    }
  };

  const handleClickBack = () => {
    if (indexCurrentTopic && allTopics && indexCurrentTopic > 0) {
      const backTopic = allTopics[indexCurrentTopic - 1];
      setIsAnimation(false);
      navigate(`/topics/cafe/${backTopic.id}`);
    }
  };

  return (
    <div className={styles.topicReact}>
      {!isLoadingAllTopics && !isLoadingCurrentTopic && currentTopic && allTopics && isAnimation
      && (
      <div>
        <h1 className={styles.title}>
          #
          {currentTopic.numberTopic}
          {' '}
          {currentTopic.titleTopic}
        </h1>
        <div className={styles.containerPlayer}>
          {currentTopic
          && (
          <ReactPlayer
            style={{ margin: '0 auto', width: '100%' }}
            url={videoUrl || ''}
            playing={isPlaying}
            playIcon={(
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                className={styles.playButton}
                onClick={() => setIsPlaying(true)}
              />
            )}
            light={imgUrl || ''}
            controls
            volume={0.5}
          />
          )}
        </div>
        {currentTopic && indexCurrentTopic !== undefined && indexCurrentTopic !== -1
        && (
        <div className={styles.btnContainer}>
          <button onClick={() => handleClickBack()} className={cn(styles.btn, styles.btnBack)} disabled={indexCurrentTopic < 1}>Назад</button>
          <button onClick={() => handleClickTestBtn()} className={cn(styles.btn, styles.btnNext)}>Перейти к заданию</button>
        </div>
        )}
      </div>
      )}
    </div>
  );
};

export default TopicReact;
