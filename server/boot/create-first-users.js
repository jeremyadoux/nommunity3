/**
 * Created by jadoux on 10/07/2016.
 */
module.exports = function (app) {
  var User = app.models.Customer;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  var userList = [
    {username: 'jadoux', email: 'jeremy.adoux@gmail.com', password: '123456', isAdmin: true}
  ];

  //create the admin role
  Role.findOrCreate({name: 'admin'}, {name: 'admin'}, function (err, role) {
    if (err) throw err;

    console.log('Created role:', role);

    userList.forEach(function (newUser) {
      console.log(newUser);
      User.findOrCreate({email: newUser.email}, newUser, function (err, user) {
        if (err) throw err;

        //make jadoux an admin
        if (newUser.isAdmin) {
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
          }, function (err, principal) {
            if (err) throw err;

            console.log('Created principal:', principal);
          });
        }
      });
    });
  });
};
