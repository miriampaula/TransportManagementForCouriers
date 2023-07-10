"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersQuery = exports.loggedUserQuery = exports.validateTokenQuery = exports.passwordRecoverQuery = exports.registerUserQuery = exports.loginUserQuery = void 0;
exports.loginUserQuery = `
EXEC dbo.LoginUser
    @email = @email,
    @password = @password
`;
exports.registerUserQuery = `
EXEC dbo.RegisterUser
    @name = @name,
    @email = @email, 
    @password = @password
`;
exports.passwordRecoverQuery = `
EXEC dbo.PasswordRecover
    @email = @email
`;
exports.validateTokenQuery = `
if not exists
(
    select * from dbo.[User] 
    where @token in (emailConfirmToken, resetPasswordToken) 
)begin
    THROW 51000, 'Token is invalid or expired.', 1;  
end
`;
exports.loggedUserQuery = `
    select *
    from dbo."User" 
    where email = @__ctx
`;
exports.getUsersQuery = `
    select *
    from [User]
`;
