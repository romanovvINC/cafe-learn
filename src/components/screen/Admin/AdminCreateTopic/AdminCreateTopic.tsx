import { useState, useEffect } from 'react';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { topicService } from '../../../../service/topics/topics.service';
import { IAnswerCreateTest } from '../../../../store/adminCreateTest/adminCreateTest.interface';
import { IAnswer, ICurrentQuestion } from '../../../../types/questionTypes';
import Checkbox from '../../../ui/Checkbox/Checkbox';
import styles from './AdminCreateTopic.module.scss';
import {role} from "../../../../types/userTypes";
import RadioButton from "../../../ui/RadioButton/RadioButton";


const uuid = require('uuid');

const AdminCreateTopic = () => {
  const [valueTextQuestion, setValueTextQuestion] = useState<string>('');
  const [answersCreateTest, setAnswersCreateTest] = useState<IAnswerCreateTest[]>([{ answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }]);
  const { questions } = useTypedSelector((state) => state.adminCreateTest);
  const [valueTextTitle, setValueTextTitle] = useState('');
  const [valueTextDescription, setValueTextDescription] = useState('');
  const [idCheckedBtns, setIdCheckedBtns] = useState('');
  const [indexQuestion, setIndexQuestion] = useState(0);
  const { addQuestion, cleanQuestions } = useActions();

  const isQuestionAdd = answersCreateTest.filter((a) => a.answerText !== '').length >= 2 && answersCreateTest.filter((a) => a.answerCorrect && a.answerText !== '').length >= 1 && valueTextQuestion !== '';

  useEffect(() => {
    setValueTextQuestion(questions[indexQuestion].textQuestion);
    if (questions[indexQuestion].allAnswer.length === 4) {
      const answers: IAnswerCreateTest[] = questions[indexQuestion].allAnswer.map((a) => ({
        answerCorrect: questions[indexQuestion].correctAnswerId.some((correctA) => correctA === a.id),
        answerText: a.textAnswer,
      }));
      setAnswersCreateTest(answers);
    }
  }, [indexQuestion]);

  const handleClickNextTest = () => {
    if (indexQuestion < 4 && isQuestionAdd) {
      addQuestion({ answers: answersCreateTest, questionsText: valueTextQuestion, questionId: questions[indexQuestion].id });
      setValueTextQuestion('');
      setAnswersCreateTest(([{ answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }]));
      setIndexQuestion((prev) => prev + 1);
    }
  };

  const handleClickBackTest = () => {
    if (indexQuestion >= 1 && isQuestionAdd) {
      addQuestion({ answers: answersCreateTest, questionsText: valueTextQuestion, questionId: questions[indexQuestion].id });
      setValueTextQuestion('');
      setAnswersCreateTest(([{ answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }]));
      setIndexQuestion((prev) => prev - 1);
    }
  };

  const handleClickSaveTopic = () => {
    if (indexQuestion === 4 && isQuestionAdd && valueTextTitle !== '' && valueTextDescription !== '') {
      const correctAnswerId: string[] = [];
      const allAnswer: IAnswer[] = answersCreateTest.map((a) => {
        const id = String(uuid.v4());
        if (a.answerCorrect === true && a.answerText !== '') {
          correctAnswerId.push(id);
        }
        return { id, idQuestion: questions[indexQuestion].id, textAnswer: a.answerText };
      });
      const question: ICurrentQuestion = {
        id: questions[indexQuestion].id, allAnswer, correctAnswerId, textQuestion: valueTextQuestion,
      };
      const allQuestions = questions.map((a) => a);
      if (allQuestions.length === 5) {
        allQuestions[4] = question;
      } else {
        allQuestions.push(question);
      }
      topicService.addTopic(allQuestions, valueTextDescription, valueTextTitle, idCheckedBtns as role);
      setValueTextQuestion('');
      setValueTextTitle('');
      setValueTextDescription('');
      setAnswersCreateTest(([{ answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }, { answerCorrect: false, answerText: '' }]));
      cleanQuestions();
      setIndexQuestion(0);
    }
  };

  return (
    <div className={styles.adminCreateTopic}>
      <h1 className={styles.adminCreateTopicTitle}>Добавить тему</h1>
      <div
        className={styles.containerContentTopic}
      >
        <div className={styles.videoContent}>
          <h3 className={styles.title}>Добавить лекцию</h3>
        </div>
        <div className={styles.containerTextContent}>
          <div className={styles.containerTitleInput}>
            <span>Название темы</span>
            <input className={styles.titleInput} onChange={(e) => setValueTextTitle(e.target.value)} value={valueTextTitle} />
          </div>
          <div className={styles.containerDescriptionInput}>
            <span>Описание темы</span>
            <textarea className={styles.descriptionInput} onChange={(e) => setValueTextDescription(e.target.value)} value={valueTextDescription} />
          </div>
        </div>
      </div>
      <h1 className={styles.adminChooseRole}>Выберите роль сотрудника:</h1>
      <div className={styles.containerRole}>
        {Object.values(role).map((value) => {
          return (
              <RadioButton onChange={(checked) => checked === true && setIdCheckedBtns(value)} key={value} type="radioBtn" checked={idCheckedBtns === value}>
                {value}
              </RadioButton>
          );
        })}
      <button>{idCheckedBtns}</button>
      </div>
      <div className={styles.containerTest}>
        <div className={styles.header}>
          <h2 className={styles.title}>Вопрос:</h2>
          <span className={styles.numberTest}>
            {indexQuestion + 1}
            {' '}
            / 5
          </span>
        </div>
        <div className={styles.createTest} style={{ overflow: 'hidden' }}>
            <div>
              <div className={styles.containerQuestionInput}>
                <input className={styles.questionsInput} placeholder="Напишите вопрос" onChange={(e) => setValueTextQuestion(e.target.value)} value={valueTextQuestion} />
              </div>
              <div className={styles.answers}>
                <h3 className={styles.title}>Ответы</h3>
                <div className={styles.containerAnswersInput}>
                  <div className={styles.containerAnswerInput}>
                    <Checkbox
                      className={styles.checkbox}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 0) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: e,
                            answerText: a.answerText,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      checked={answersCreateTest[0].answerCorrect}
                    />
                    <span>1</span>
                    <textarea
                      className={styles.answerInput}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 0) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: a.answerCorrect,
                            answerText: e.target.value,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      value={answersCreateTest[0].answerText}
                    />
                  </div>
                  <div className={styles.containerAnswerInput}>
                    <Checkbox
                      className={styles.checkbox}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 1) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: e,
                            answerText: a.answerText,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      checked={answersCreateTest[1].answerCorrect}
                    />
                    <span>2</span>
                    <textarea
                      className={styles.answerInput}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 1) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: a.answerCorrect,
                            answerText: e.target.value,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      value={answersCreateTest[1].answerText}
                    />
                  </div>
                  <div className={styles.containerAnswerInput}>
                    <Checkbox
                      className={styles.checkbox}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 2) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: e,
                            answerText: a.answerText,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      checked={answersCreateTest[2].answerCorrect}
                    />
                    <span>3</span>
                    <textarea
                      className={styles.answerInput}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 2) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: a.answerCorrect,
                            answerText: e.target.value,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      value={answersCreateTest[2].answerText}
                    />
                  </div>
                  <div className={styles.containerAnswerInput}>
                    <Checkbox
                      className={styles.checkbox}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 3) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: e,
                            answerText: a.answerText,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      checked={answersCreateTest[3].answerCorrect}
                    />
                    <span>4</span>
                    <textarea
                      className={styles.answerInput}
                      onChange={(e) => setAnswersCreateTest(answersCreateTest.map((a, idx) => {
                        if (idx === 3) {
                          const currentAnswer: IAnswerCreateTest = {
                            answerCorrect: a.answerCorrect,
                            answerText: e.target.value,
                          };
                          return currentAnswer;
                        }
                        return a;
                      }))}
                      value={answersCreateTest[3].answerText}
                    />
                  </div>
                </div>
              </div>
            </div>
          <div
            className={styles.containerBtn}
          >
            <button className={styles.btn} onClick={() => handleClickBackTest()} disabled={indexQuestion < 1 || !isQuestionAdd}>Предыдущий тест</button>
            {indexQuestion < 4 && <button className={styles.btn} onClick={() => handleClickNextTest()} disabled={!isQuestionAdd}>Следующий тест</button>}
            {indexQuestion === 4 && <button className={styles.btn} onClick={() => handleClickSaveTopic()}>Добавить тему</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateTopic;
