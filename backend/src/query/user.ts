export const loginUserQuery = `
EXEC dbo.LoginUser
    @email = @email,
    @password = @password
`;

export const registerUserQuery = `
EXEC dbo.RegisterUser
    @name = @name,
    @email = @email, 
    @password = @password
`;

export const passwordRecoverQuery = `
EXEC dbo.PasswordRecover
    @email = @email
`;

export const validateTokenQuery = `
if not exists
(
    select * from dbo.[User] 
    where @token in (emailConfirmToken, resetPasswordToken) 
)begin
    THROW 51000, 'Token is invalid or expired.', 1;  
end
`;

export const loggedUserQuery = `
    select *
    from dbo."User" 
    where email = @__ctx
`;

export const getUsersQuery = `
select *
from dbo."User" 
`;
