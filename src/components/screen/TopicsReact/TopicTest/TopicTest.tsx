import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './TopicTest.module.scss';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import { userTest } from '../../../../service/userTest/userTest.service';
import { useAuth } from '../../../../hooks/useAuth';
import Modal from '../../../ui/Modal/modal';
import { getPointUser } from '../../../../utils/getPointUser';

const TopicTest = () => {
  const {
    allAnswersUser, allQuestions, currentQuestion, currentTopicTitle, idTest, nextTopicId,
  } = useTypedSelector((state) => state.currentTest);
  const [idCheckedBtns, setIdCheckedBtns] = useState<string[]>([]);
  const { addAnswer, changeCurrentQuestion, cleanCurrentQuestion } = useActions();
  const [isViewModal, setIsViewModal] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (allAnswersUser && allAnswersUser.length > 0 && currentQuestion) {
      const answers = allAnswersUser.find((answer) => answer.idQuestion === currentQuestion.id);
      if (answers !== undefined) {
        setIdCheckedBtns(answers.IdAnswersUser);
      }
    }
  }, [currentQuestion]);

  const handleClickCheckbox = (checked: boolean, answerId: string) => {
    if (checked === true) {
      setIdCheckedBtns([...idCheckedBtns, answerId]);
    }
    if (checked === false) {
      const filteredCheckbox = idCheckedBtns.filter((idCheckbox) => idCheckbox !== answerId);
      setIdCheckedBtns([...filteredCheckbox]);
    }
  };

  const currentIndex = allQuestions?.findIndex((question) => question.id === currentQuestion?.id);

  const nextTest = () => {
    if (currentQuestion && currentIndex !== undefined && allQuestions) {
      if (currentIndex < allQuestions.length - 1) {
        addAnswer({
          idQuestion: currentQuestion.id,
          idAnswersUser: idCheckedBtns,
        });

        setTimeout(() => {
          changeCurrentQuestion({ index: currentIndex + 1 });
          setIdCheckedBtns([]);
        }, 200);
      }
    }
  };

  const prevTest = () => {
    if (currentQuestion && currentIndex !== undefined && allQuestions) {
      if (currentIndex > 0) {
        addAnswer({
          idQuestion: currentQuestion.id,
          idAnswersUser: idCheckedBtns,
        });
        setTimeout(() => {
          changeCurrentQuestion({ index: currentIndex - 1 });
          setIdCheckedBtns([]);
        }, 200);
      }
    }
  };

  const saveResultTest = () => {
    if (currentQuestion && currentIndex !== undefined && allQuestions && user && idTest && nextTopicId) {
      const indexAnswer = allAnswersUser?.findIndex((answer) => answer.idQuestion === currentQuestion.id);
      const userAnswers = allAnswersUser?.map((a) => ({ ...a }));

      if (userAnswers && indexAnswer !== undefined && indexAnswer !== -1) {
        userAnswers[indexAnswer] = {
          IdAnswersUser: idCheckedBtns,
          idQuestion: currentQuestion.id,
        };
      } else if (userAnswers && (indexAnswer === undefined || indexAnswer === -1)) {
        userAnswers.push({
          IdAnswersUser: idCheckedBtns,
          idQuestion: currentQuestion.id,
        });
      }

      if (userAnswers) {
        userTest.saveResultsTest(user.id, idTest, userAnswers, allQuestions);
        setIsViewModal(true);

        if (nextTopicId === 'lastTopic') {
          setTimeout(() => {
            cleanCurrentQuestion();
            navigate('/topics/cafe');
          }, 3500);
        } else {
          setTimeout(() => {
            cleanCurrentQuestion();
            navigate(`/topics/cafe/${nextTopicId}`);
          }, 3500);
        }
      }
    }
  };

  console.log(allQuestions, currentQuestion)

  return (
    <div className={styles.topicTest}>
      {allQuestions && currentQuestion && currentIndex !== undefined && currentIndex !== -1
      && (
      <>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Вопросы по теме
            {currentTopicTitle}
          </h1>
          <span className={styles.numberTest}>
            {currentIndex + 1}
            {' '}
            /
            {' '}
            {allQuestions?.length}
          </span>
        </div>
        <div className={styles.contentTest} style={{ overflow: 'hidden' }}>
            <div>
              <h2 className={styles.questions}>{currentQuestion?.textQuestion}</h2>
              <div className={styles.answersContainer}>
                {currentQuestion.correctAnswerId.length === 1 && currentQuestion.allAnswer.map((answer) => <input onChange={(checked) => checked === true && setIdCheckedBtns([answer.id])} key={answer.id} className={styles.answer} type="radioBtn" checked={idCheckedBtns.some((idRadio) => idRadio === answer.id)}>{answer.textAnswer}</input>)}
                {currentQuestion.correctAnswerId.length > 1 && currentQuestion.allAnswer.map((answer) => <input type="checkbox" onChange={(checked) => handleClickCheckbox(checked, answer.id)} key={answer.id} className={styles.answer} checked={idCheckedBtns.some((idCheckbox) => idCheckbox === answer.id)}>{answer.textAnswer}</input>)}
              </div>
            </div>
          <div className={styles.containerBtn}>
            <button className={cn(styles.btn, styles.btnBack)} onClick={() => prevTest()} color="White" disabled={currentIndex <= 0 || idCheckedBtns.length === 0}>Назад</button>
            {currentIndex < allQuestions.length - 1 && <button className={cn(styles.btn, styles.btnNext)} onClick={() => nextTest()} disabled={allQuestions.length - 1 <= currentIndex || idCheckedBtns.length === 0}>Следующий вопрос</button>}
            {currentIndex === allQuestions.length - 1 && <button className={cn(styles.btn, styles.btnNext)} onClick={() => saveResultTest()} disabled={idCheckedBtns.length === 0}>Завершить тест</button>}
          </div>
        </div>
      </>
      )}
      <Modal
        active={isViewModal}
        setActive={setIsViewModal}
        count={Number(getPointUser(allQuestions || [], [...allAnswersUser || [], {
          IdAnswersUser: idCheckedBtns,
          idQuestion: currentQuestion?.id || '',
        }]))}
      />
    </div>
  );
};

export default TopicTest;
