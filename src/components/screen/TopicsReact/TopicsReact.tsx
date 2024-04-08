import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ITopic } from '../../../types/topicTypes';
import SliderTheme from '../../ui/SliderTheme/SliderTheme';
import styles from './TopicsReact.module.scss';
import { useTopicsReact } from './useTopicReact';
import {Link} from "react-router-dom";

const TopicsReact = () => {
  const { user } = useAuth();
  const {
    topicsData, userData, topicsLoading, userLoading,
  } = useTopicsReact(user?.id || '');
  let sortAllTopics: ITopic[] = [];
  if (topicsData && userData) {
    sortAllTopics = topicsData.sort((a, b) => a.numberTopic - b.numberTopic).map((topic) => {
      if (userData.pointTests.some((test) => test.idTest === topic.relatedQuestionsId)) {
        topic.passedTopic = true;
        return topic;
      }

      return topic;
    });
  }

  return (
    <div className={styles.containerFooter}>
      <div className={styles.containerTopicsReact}>
        <div className={styles.topicsReact}>
          {!topicsLoading && topicsData
          && (
          <div className={styles.loadingAnimation}>
            <h1 className={styles.title}>Курсы</h1>
            <div>
              {
                sortAllTopics.map((topic) => {
                  return (
                      <div>
                        <h1>{topic.titleTopic}</h1>
                        <p>{topic.descriptionTopic}</p>
                        <Link to={`${topic.id}`}>Перейти</Link>
                      </div>
                  )
                })
              }
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicsReact;
