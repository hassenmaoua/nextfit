package org.nextfit.backend.service.user;


import org.nextfit.backend.dto.requests.CompelationRequest;
import org.nextfit.backend.entity.User;

public interface IUserService {

    User completeRegistration(Long userId, CompelationRequest request);

    User add(User user);

    User update(User user);

    User get(Long id);

    User get(String email);

    boolean handleEnable(Long id);

    boolean handleLock(Long id);

    boolean emailExists(String email);

    User changeEmail(String oldEmail, String newEmail);

    User changePassword(Long userId,String oldPassword, String newPassword);

    boolean userExists(String username);

    void disableAccount(User user);
}
