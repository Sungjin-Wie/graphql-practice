let crypto = require("crypto");
let wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

let QueryResolvers = {
  test: () => {
    return "foo";
  },
  testAsync: async ({ time }) => {
    await wait(time);
    return `delayed for ${time}ms`;
  },
  getContact: ({ id }) => {
    return Contacts[id];
  },
  doesPhoneNumberExist: ({ phoneNumber }) => {
    for (let id in Contacts) {
      if (phoneNumber == Contacts[id].phoneNumber) {
        return true;
      }
    }
    return false;
  },
  doesIDExist: ({ id }) => {
    if (Contacts[id]) {
      return true;
    }
    return false;
  },
  getAllContacts: async () => {
    await wait(300);
    let ContactArr = [];
    for (let id in Contacts) {
      ContactArr.push(Contacts[id]);
    }
    return ContactArr;
  },
  getAllPhoneNumbers: () => {
    let PhoneNumberArr = [];
    for (let id in Contacts) {
      PhoneNumberArr.push(Contacts[id].phoneNumber);
    }
    return PhoneNumberArr;
  },
};

let MutationResolvers = {
  insertContact: ({ name, phoneNumber }) => {
    for (let _ in Contacts) {
      if (phoneNumber == Contacts[_].phoneNumber)
        return new MutationResult(false, "중복된 전화번호입니다.");
    }
    let id = crypto.randomBytes(10).toString("hex");
    Contacts[id] = new Contact(id, name, phoneNumber);
    return new MutationResult(true, "성공했습니다.", Contacts[id]);
  },
  updateContact: ({ id, name, phoneNumber }) => {
    if (Contacts[id]) {
      Contacts[id].name = name;
      Contacts[id].phoneNumber = phoneNumber;
      return new MutationResult(true, "성공했습니다.", Contacts[id]);
    } else {
      return new MutationResult(false, "존재하지 않는 ID입니다.");
    }
  },
  deleteContact: ({ id }) => {
    if (Contacts[id]) {
      delete Contacts[id];
      return new MutationResult(true, "성공했습니다.");
    } else {
      return new MutationResult(false, "존재하지 않는 ID입니다.");
    }
  },
};

class Contact {
  constructor(id = "", name = "", phoneNumber = "") {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}

class MutationResult {
  constructor(isMutated, msg = "", contact = new Contact()) {
    this.isMutated = isMutated;
    this.msg = msg;
    this.contact = contact;
  }
}

const Contacts = {};
for (let i = 10; i < 50; i++) {
  let id = crypto.randomBytes(10).toString("hex");
  Contacts[id] = new Contact(id, `test${i}`, `010123400${i}`);
}

module.exports = { ...QueryResolvers, ...MutationResolvers };
