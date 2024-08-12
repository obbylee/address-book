import "./style.css";
import dataContacts from "./data.json";

const AddressBookService = () => {
  const collectionOfAddresses = document.querySelector("#addresses");

  document.querySelector("#addContact").addEventListener("click", () => {
    document.querySelector("#modal").classList.remove("hidden");
  });

  document.querySelector("#btnCloseModal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.querySelector("#btnSave").addEventListener("click", () => {
    const input = document.querySelectorAll("#form input");

    if (
      !document.querySelector("input[name='fullname']").value ||
      !document.querySelector("input[name='phone']").value ||
      !document.querySelector("input[name='email']").value ||
      !document.querySelector("input[name='address']").value
    ) {
      alert("field cannot be empty!");
      return;
    }

    const data = {
      id: document.querySelector("input[name='id']").value || Date.now(),
      fullName: document.querySelector("input[name='fullname']").value,
      phone: document.querySelector("input[name='phone']").value,
      email: document.querySelector("input[name='email']").value,
      address: document.querySelector("input[name='address']").value,
    };

    saveContacts(data);
  });

  function resetAddressBook() {
    collectionOfAddresses.innerHTML = "";
  }

  function getAddressBook(data) {
    resetAddressBook();
    const addresses = document.getElementById("addresses");
    data.forEach((contact) => {
      const article = document.createElement("article");
      article.className =
        "w-full flex flex-col border border-gray-500 rounded p-4";

      const title = document.createElement("h1");
      title.className = "font-medium text-xl";
      title.textContent = contact.fullName;

      const box = document.createElement("address");

      const phone = document.createElement("p");
      phone.textContent = contact.phone;
      const email = document.createElement("p");
      email.textContent = contact.email;
      const address = document.createElement("p");
      address.textContent = contact.address;

      box.append(phone, email, address);

      article.append(title, box);

      addresses.append(article);
    });
  }

  function saveContacts(data) {
    const currentContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const contactIsExist = currentContacts.find((val) => val.id === data.id);

    if (contactIsExist) {
      alert("contact is already exist!");
      return;
    }

    currentContacts.push(data);

    localStorage.setItem("contacts", JSON.stringify(currentContacts));

    getAddressBook(currentContacts);

    document.querySelector("#modal").classList.add("hidden");
  }

  function editContact(data) {
    const currentContacts = localStorage.getItem("contacts");

    const contactIsExist = JSON.parse(currentContacts).find(
      (val) => val.id === data.id
    );

    if (!contactIsExist) {
      alert("contact is not found");
      return;
    }

    contactIsExist = data;

    localStorage.setItem("contacts", JSON.stringify(currentContacts));

    return;
  }

  function deleteContact(id) {
    const currentContacts = localStorage.getItem("contacts");

    const contactIsExist = JSON.parse(currentContacts).find(
      (val) => val.id === data.id
    );

    if (!contactIsExist) {
      alert("contact is not found");
      return;
    }

    const index = currentContacts.indexOf(contactIsExist);

    JSON.parse(currentContacts).splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(currentContacts));
    return;
  }

  return {
    render: (data) => {
      getAddressBook(data);
    },
  };
};

const currentContacts = localStorage.getItem("contacts");

const dataContactStorage = currentContacts
  ? JSON.parse(currentContacts)
  : dataContacts;

AddressBookService().render(dataContactStorage);
