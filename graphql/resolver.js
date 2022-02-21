let wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

let QueryResolvers = {
  test: () => {
    return 'foo';
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
  getAllContacts: () => {
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
  insertContact: ({ id, name, phoneNumber }) => {
    if (Contacts[id]) {
      return new MutationResult(false, '중복된 ID입니다.');
    } else {
      for (let _ in Contacts) {
        if (phoneNumber == Contacts[_].phoneNumber)
          return new MutationResult(false, '중복된 전화번호입니다.');
      }
      Contacts[id] = new Contact(id, name, phoneNumber);
      return new MutationResult(true, '성공했습니다.', Contacts[id]);
    }
  },
  updateContact: ({ id, name, phoneNumber }) => {
    if (Contacts[id]) {
      Contacts[id].name = name;
      Contacts[id].phoneNumber = phoneNumber;
      return new MutationResult(true, '성공했습니다.', Contacts[id]);
    } else {
      return new MutationResult(false, '존재하지 않는 ID입니다.');
    }
  },
  deleteContact: ({ id }) => {
    if (Contacts[id]) {
      delete Contacts[id];
      return new MutationResult(true, '성공했습니다.');
    } else {
      return new MutationResult(false, '존재하지 않는 ID입니다.');
    }
  },
};

class Contact {
  constructor(id = '', name = '', phoneNumber = '') {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}

class MutationResult {
  constructor(isMutated, msg = '', contact = new Contact()) {
    this.isMutated = isMutated;
    this.msg = msg;
    this.contact = contact;
  }
}

const Contacts = {};
Contacts['foo'] = new Contact('foo', 'test', '01093270377');
Contacts['goo'] = new Contact('goo', 't2st', '01093270378');

module.exports = { ...QueryResolvers, ...MutationResolvers };
