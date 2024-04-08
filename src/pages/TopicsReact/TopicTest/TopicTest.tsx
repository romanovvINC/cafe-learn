import React, { useEffect } from 'react';
import TopicTest from '../../../components/screen/TopicsReact/TopicTest/TopicTest';
import { useActions } from '../../../hooks/useActions';

const TopicTestPage = () => {
  const { cleanCurrentQuestion } = useActions();

  useEffect(() => () => {
    cleanCurrentQuestion();
  }, []);

  return (
    <>
      <TopicTest />
    </>
  );
};

export default TopicTestPage;
