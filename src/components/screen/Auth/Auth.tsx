import {useEffect, useState} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import { useActions } from '../../../hooks/useActions';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Auth.module.scss';
import { validEmail } from '../../../utils/regex';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const Auth = () => {
    const [type, setType] = useState<'login' | 'registration'>('login');
    const { user, isLoading } = useAuth();
    const { isVisible } = useTypedSelector((state) => state.authModal);
    const { registration, login, toggleModalAuth } = useActions();

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
        getValues,
    } = useForm({
        mode: 'onChange',
    });

    useEffect(() => {
        toggleModalAuth({isVisible: true});
    }, [toggleModalAuth])

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        if (type === 'login') {
            login({ email: data.email, password: data.password });
            reset();
        }
        if (type === 'registration') {
            registration({
                email: data.email, password: data.password, avatar: '', name: data.name,
            });
            reset();
        }
    };

    if (user && isLoading === false) {
        console.log(user, isLoading);
        toggleModalAuth({ isVisible: false });
    }

    return (
        isVisible
            ? (
                <div className={styles.authContainer} onClick={() => toggleModalAuth({ isVisible: false })}>
                    <form className={cn(styles.authForm)} onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
                        <h1>Email: yaroslav@mail.ru</h1>
                        <h1>Password: 123456</h1>
                        <h1 className={styles.title}>{type === 'registration' ? 'Регистрация' : 'Авторизация'}</h1>

                        {type === 'registration'
                            && (
                                <div className={styles.field}>
                                    <label htmlFor="name">Имя:</label>
                                    <input
                                        className={styles.input}
                                        id="name"
                                        type="text"
                                        placeholder="Введите имя"
                                        {...register(
                                            'name',
                                            {
                                                required: 'Поле обязательно к заполнению',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Минимум 2 символа',
                                                },
                                                maxLength: {
                                                    value: 18,
                                                    message: 'Максимум 18 символов',
                                                },
                                            },
                                        )}
                                    />
                                    <div>
                                        {errors?.name?.message
                                            && <p className={styles.errorText}>{`${errors.name.message || 'Ошибка заполнения'}`}</p>}
                                    </div>
                                </div>
                            )}

                        <div className={styles.field}>
                            <label htmlFor="email">Email:</label>
                            <input
                                className={styles.input}
                                id="email"
                                type="text"
                                placeholder="Введите email"
                                {...register(
                                    'email',
                                    {
                                        required: 'Поле обязательно к заполнению',
                                        pattern: {
                                            value:
                                            validEmail,
                                            message: 'Неправильный формат email',
                                        },
                                    },
                                )}
                            />
                            <div>
                                {errors?.email
                                    && <p className={styles.errorText}>{`${errors.email.message || 'Ошибка заполнения'}`}</p>}
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Пароль:</label>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Введите пароль"
                                {...register(
                                    'password',
                                    {
                                        required: 'Поле обязательно к заполнению',
                                        minLength: {
                                            value: 5,
                                            message: 'Минимум 5 символов',
                                        },
                                        maxLength: {
                                            value: 18,
                                            message: 'Максимум 18 символов',
                                        },
                                    },
                                )}
                            />
                            <div>
                                {errors?.password
                                    && <p className={styles.errorText}>{`${errors.password.message || 'Ошибка заполнения'}`}</p>}
                            </div>
                        </div>
                        {type === 'registration'
                            && (
                                <div className={styles.field}>
                                    <label htmlFor="password">Повторите пароль:</label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        placeholder="Введите пароль еще раз"
                                        {...register(
                                            'repeatPassword',
                                            {
                                                required: 'Поле обязательно к заполнению',
                                                minLength: {
                                                    value: 5,
                                                    message: 'Минимум 5 символов',
                                                },
                                                maxLength: {
                                                    value: 18,
                                                    message: 'Максимум 18 символов',
                                                },
                                                validate: {
                                                    value: (value) => value === getValues('password'),
                                                },
                                            },
                                        )}
                                    />
                                    <div>
                                        {errors?.repeatPassword
                                            && <p className={styles.errorText}>{`${errors.repeatPassword.message || 'Пароли не совпадают'}`}</p>}
                                    </div>
                                </div>
                            )}

                        {type === 'login'
                            && (
                                <div className={styles.btnContainer}>
                                    <div className={styles.typeBtn} onClick={() => setType('registration')}>Зарегистрироваться</div>
                                    <button type="submit" disabled={!isValid}>
                                        <button className={styles.btnAuth} disabled={!isValid}>Войти</button>
                                    </button>
                                </div>
                            )}
                        {type === 'registration'
                            && (
                                <div className={styles.btnContainer}>
                                    <div className={styles.typeBtn} onClick={() => setType('login')}>Войти</div>
                                    <button type="submit">
                                        <button className={styles.btnAuth} disabled={!isValid}>Зарегистрироваться</button>
                                    </button>
                                </div>
                            )}
                    </form>
                </div>
            ) : null
    );
};

export default Auth;
