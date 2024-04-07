export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    role: role;
    pointTests: IPointTest[]
}

export enum role {
    INTERN = 'intern',
    BARISTA = 'barista',
    MANAGER = 'manager',
    ADMINISTRATOR = 'administrator',
    HR_MANAGER = 'hr-manager'
}

export interface IPointTest {
    idUser: string;
    idTest: string;
    points: number;
}

export interface IStatUser {
    value: number;
    isFilled: boolean;
}