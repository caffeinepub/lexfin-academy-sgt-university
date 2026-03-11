import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Role = {
    #faculty;
    #student;
  };

  module Role {
    public func compare(role1 : Role, role2 : Role) : Order.Order {
      switch (role1, role2) {
        case (#faculty, #student) { #less };
        case (#student, #faculty) { #greater };
        case (_, _) { #equal };
      };
    };
  };

  type Registration = {
    name : Text;
    email : Text;
    department : Text;
    role : Role;
  };

  module Registration {
    public func compareByRole(reg1 : Registration, reg2 : Registration) : Order.Order {
      Registration.compareByRoleName(reg1, reg2);
    };

    public func compareByRoleName(reg1 : Registration, reg2 : Registration) : Order.Order {
      switch (Role.compare(reg1.role, reg2.role)) {
        case (#equal) { Text.compare(reg1.name, reg2.name) };
        case (other) { other };
      };
    };

    public func compareByEmail(reg1 : Registration, reg2 : Registration) : Order.Order {
      Text.compare(reg1.email, reg2.email);
    };

    public func compareByDepartment(reg1 : Registration, reg2 : Registration) : Order.Order {
      Text.compare(reg1.department, reg2.department);
    };
  };

  let registrations = Map.empty<Principal, Registration>();

  public shared ({ caller }) func register(name : Text, email : Text, department : Text, role : Role) : async () {
    if (registrations.containsKey(caller)) { Runtime.trap("This user is already registered.") };
    let registration = {
      name;
      email;
      department;
      role;
    };
    registrations.add(caller, registration);
  };

  public query ({ caller }) func isRegistered() : async Bool {
    registrations.containsKey(caller);
  };

  public query ({ caller }) func getRegistration(user : Principal) : async Registration {
    switch (registrations.get(user)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?registration) { registration };
    };
  };

  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    registrations.values().toArray();
  };
};
