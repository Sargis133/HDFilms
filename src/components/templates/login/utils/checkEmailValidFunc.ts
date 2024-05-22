export const checkEmailValidFunc = (email: string) => {
    const emailRegExp = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return emailRegExp.test(email)
}