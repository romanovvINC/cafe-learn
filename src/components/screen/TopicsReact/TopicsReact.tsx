import React, {useEffect, useState} from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ITopic } from '../../../types/topicTypes';
import styles from './TopicsReact.module.scss';
import { useTopicsReact } from './useTopicReact';
import {Link} from "react-router-dom";

const TopicsReact = () => {
  const { user } = useAuth();
  const {
    topicsData, userData, topicsLoading, userLoading,
  } = useTopicsReact(user?.id || '');
  const [sortAllTopics, setSortAllTopics] = useState<ITopic[]>([]);
  useEffect(() => {
    if (topicsData && userData) {
      setSortAllTopics(topicsData.filter((topic) => topic.role === user?.role).sort((a, b) => a.numberTopic - b.numberTopic).map((topic) => {
        if (userData.pointTests.some((test) => test.idTest === topic.relatedQuestionsId)) {
          topic.passedTopic = true;
          return topic;
        }
        return topic;
      }));
    } else {
      setSortAllTopics([]);
    }
  }, [topicsData, userData, user])

  return (
    <div className={styles.containerFooter}>
      <div className={styles.containerTopicsReact}>
          {!topicsLoading && topicsData
          && (
          <div className={styles.topicsReact}>
            {sortAllTopics.length === 0 ? <h1 className={styles.title}>Курсы не найдены</h1> : <h1 className={styles.title}>Курсы</h1>}
            <div className={styles.topicsContainer}>
              {
                sortAllTopics.map((topic, key) => {
                  const topicImage = require(`../../../assets/img/${topic.pictureTopicUrl}`);
                  return (
                      <div className={styles.topicElement}>
                        <h1>#{key + 1} {topic.titleTopic}</h1>
                        <img src={topicImage} alt='topic preview' className={styles.topicPreview}/>
                        <p className={styles.description}>{topic.descriptionTopic}</p>
                        <Link to={`${topic.id}`} className={styles.topicLink}>Перейти</Link>
                      </div>
                  )
                })
              }
            </div>
          </div>
          )}
        </div>
    </div>
  );
};

export default TopicsReact;
