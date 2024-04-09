import {role} from '../types/userTypes';

export const getRoleComparison = (myRole: role, userRole: role) => {
    const rolesObjectObject = Object.values(role);
    return (rolesObjectObject.indexOf(myRole) > rolesObjectObject.indexOf(userRole));
};
